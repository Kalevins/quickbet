"use client";

import { useEffect, useState } from "react";

import { DescriptionBanner, ListMovies } from "@/components";
import type { Keyword, MovieDetails, MovieListsResponse } from "@/types";
import {
  getDetailsMovies,
  getFavorites,
  getMovieKeywords,
  getRecommendationsMovies,
} from "@/api";
import { initialMovieDetails, initialMovieLists } from "@/constants";
import styles from "./styles.module.css";
import { useAuth, useLoadingScreen } from "@/contexts";

export default function MovieDetails({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const { handleIsLoadingScreen } = useLoadingScreen();
  const { isAuth } = useAuth();
  const [detailsMovie, setDetailsMovie] =
    useState<MovieDetails>(initialMovieDetails);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [keywordsMovie, setKeywordsMovie] = useState<Keyword[]>([]);
  const [RecommendationsMovies, setRecommendationsMovies] =
    useState<MovieListsResponse>(initialMovieLists);

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
    handleIsLoadingScreen(true);
    Promise.all([
      getDetailsMovies({ id: params.id }),
      getMovieKeywords({ id: params.id }),
      getRecommendationsMovies({ id: params.id }),
    ])
      .then(
        ([
          responseDetailsMovies,
          responseMovieKeywords,
          responseRecommendationsMovies,
        ]) => {
          setDetailsMovie(responseDetailsMovies);
          setKeywordsMovie(responseMovieKeywords.keywords);
          setRecommendationsMovies(responseRecommendationsMovies);
        },
      )
      .finally(() => {
        handleIsLoadingScreen(false);
      });
  }, []);

  return (
    <main className={styles.container}>
      <DescriptionBanner
        id={detailsMovie.id}
        title={detailsMovie.title}
        description={detailsMovie.overview}
        date={detailsMovie.release_date}
        duration={detailsMovie.runtime}
        image={detailsMovie.backdrop_path}
        imagePoster={detailsMovie.poster_path}
        isFavorite={favorites.includes(detailsMovie.id)}
        rating={detailsMovie.vote_average}
        keywords={keywordsMovie}
        homepage={detailsMovie.homepage}
      />
      <div className={styles.content}>
        <div className={styles.movies}>
          <ListMovies
            title="Recommendations"
            movies={RecommendationsMovies}
            favorites={favorites}
            wrap={false}
          />
        </div>
      </div>
    </main>
  );
}
