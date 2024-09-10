"use client";

import { useEffect, useState } from "react";

import { PopularBanner, ListMovies } from "@/components";
import {
  getDiscoverMovies,
  getGenres,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getKeywordsSearch,
  getFavorites,
} from "@/api";
import { initialMovie, initialMovieLists } from "@/constants";
import type { Genre, Keyword, Movie, MovieListsResponse } from "@/types";
import styles from "./styles.module.css";
import { useAuth, useLoadingScreen } from "@/contexts";

export default function Home(): JSX.Element {
  const { handleIsLoadingScreen } = useLoadingScreen();
  const { isAuth } = useAuth();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [popularMovies, setPopularMovies] =
    useState<MovieListsResponse>(initialMovieLists);
  const [nowPlayingMovies, setNowPlayingMovies] =
    useState<MovieListsResponse>(initialMovieLists);
  const [upcomingMovies, setUpcomingMovies] =
    useState<MovieListsResponse>(initialMovieLists);
  const [topRatedMovies, setTopRatedMovies] =
    useState<MovieListsResponse>(initialMovieLists);
  const [discoverMovies, setDiscoverMovies] =
    useState<MovieListsResponse>(initialMovieLists);
  const [movieBanner, setMovieBanner] = useState<Movie>(initialMovie);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<number>(0);
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    handleIsLoadingScreen(true);
    Promise.all([getGenres(), getPopularMovies()])
      .then(([responseGenres, responsePopularMovies]) => {
        const randomMovie =
          responsePopularMovies.results[
            Math.floor(Math.random() * responsePopularMovies.results.length)
          ];
        setGenres(responseGenres.genres);
        setMovieBanner(randomMovie);
      })
      .finally(() => {
        handleIsLoadingScreen(false);
      });
  }, []);

  useEffect(() => {
    if (!isAuth) {
      setFavorites([]);
      return;
    }
    getFavorites().then((response) => {
      setFavorites(response);
    });
  }, [isAuth]);

  useEffect(() => {
    getPopularMovies({
      page: popularMovies.page,
    }).then((response) => {
      setPopularMovies({
        ...response,
        results: [...popularMovies.results, ...response.results],
      });
    });
  }, [popularMovies.page]);

  useEffect(() => {
    getNowPlayingMovies({
      page: nowPlayingMovies.page,
    }).then((response) => {
      setNowPlayingMovies({
        ...response,
        results: [...nowPlayingMovies.results, ...response.results],
      });
    });
  }, [nowPlayingMovies.page]);

  useEffect(() => {
    getUpcomingMovies({
      page: upcomingMovies.page,
    }).then((response) => {
      setUpcomingMovies({
        ...response,
        results: [...upcomingMovies.results, ...response.results],
      });
    });
  }, [upcomingMovies.page]);

  useEffect(() => {
    getTopRatedMovies({
      page: topRatedMovies.page,
    }).then((response) => {
      setTopRatedMovies({
        ...response,
        results: [...topRatedMovies.results, ...response.results],
      });
    });
  }, [topRatedMovies.page]);

  useEffect(() => {
    if (selectedKeyword !== 0 || selectedGenre !== 0) {
      getDiscoverMovies({
        page: 1,
        with_keywords: selectedKeyword,
        with_genres: selectedGenre,
      }).then((response) => {
        setDiscoverMovies(response);
      });
    } else {
      setDiscoverMovies({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
    }
  }, [selectedKeyword, selectedGenre]);

  useEffect(() => {
    if (search === "") {
      setKeywords([]);
      setSelectedKeyword(0);
      return;
    }

    getKeywordsSearch({ query: search, page: 1 }).then((response) => {
      setKeywords(response.results);
    });

    const match = keywords.find((keyword) => keyword.name === search);

    if (match) {
      setSelectedKeyword(match.id);
    }
  }, [search]);

  const handleNextPagePopular = (): void => {
    if (popularMovies.page === popularMovies.total_pages) {
      return;
    }

    setPopularMovies({
      ...popularMovies,
      page: popularMovies.page + 1,
    });
  };

  const handleNextPageNowPlaying = (): void => {
    if (nowPlayingMovies.page === nowPlayingMovies.total_pages) {
      return;
    }

    setNowPlayingMovies({
      ...nowPlayingMovies,
      page: nowPlayingMovies.page + 1,
    });
  };

  const handleNextPageUpcoming = (): void => {
    if (upcomingMovies.page === upcomingMovies.total_pages) {
      return;
    }

    setUpcomingMovies({
      ...upcomingMovies,
      page: upcomingMovies.page + 1,
    });
  };

  const handleNextPageTopRated = (): void => {
    if (topRatedMovies.page === topRatedMovies.total_pages) {
      return;
    }

    setTopRatedMovies({
      ...topRatedMovies,
      page: topRatedMovies.page + 1,
    });
  };

  return (
    <main className={styles.container}>
      <PopularBanner
        id={movieBanner.id}
        title={movieBanner.title}
        description={movieBanner.overview}
        image={movieBanner.backdrop_path}
        isFavorite={favorites.includes(movieBanner.id)}
        rating={movieBanner.vote_average}
      />
      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.search}>
            <h4>Search</h4>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Keywords"
              list="keywords"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoComplete="off"
            />
            <datalist id="keywords">
              {keywords.map((keyword) => (
                <option key={keyword.id} value={keyword.name} />
              ))}
            </datalist>
          </div>
          <div className={styles.genres}>
            <h4>Genres</h4>
            <div className={styles.genreSelect}>
              {selectedGenre === 0 ? (
                <span>All Genres</span>
              ) : (
                <span>
                  {genres.find((genre) => genre.id === selectedGenre)?.name}
                </span>
              )}
            </div>
            <div className={styles.genreList}>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  className={styles.genre}
                  id={genre.id === selectedGenre ? styles.selected : ""}
                  onClick={() => {
                    if (selectedGenre === genre.id) {
                      setSelectedGenre(0);
                    } else {
                      setSelectedGenre(genre.id);
                    }
                  }}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.movies}>
          {discoverMovies.results.length > 0 ? (
            <ListMovies
              title="Discovered"
              movies={discoverMovies}
              favorites={favorites}
              wrap={false}
            />
          ) : (
            <>
              <ListMovies
                title="Popular"
                movies={popularMovies}
                favorites={favorites}
                handleNextPage={handleNextPagePopular}
              />
              <ListMovies
                title="Now Playing"
                movies={nowPlayingMovies}
                favorites={favorites}
                handleNextPage={handleNextPageNowPlaying}
              />
              <ListMovies
                title="Upcoming"
                movies={upcomingMovies}
                favorites={favorites}
                handleNextPage={handleNextPageUpcoming}
              />
              <ListMovies
                title="Top Rated"
                movies={topRatedMovies}
                favorites={favorites}
                handleNextPage={handleNextPageTopRated}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
