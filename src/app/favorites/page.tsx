"use client";

import { useEffect, useState } from "react";

import { ListMovies, Loading } from "@/components";
import type { MovieListsResponse } from "@/types";
import { getDetailsMovies, getFavorites } from "@/api";
import { initialMovieLists } from "@/constants";
import styles from "./styles.module.css";
import { useAuth, useLoadingScreen, useModalLogin } from "@/contexts";

export default function Favorites(): JSX.Element {
  const { handleIsLoadingScreen } = useLoadingScreen();
  const { handleOpenModal } = useModalLogin();
  const { isAuth } = useAuth();
  const [detailsMovie, setDetailsMovie] =
    useState<MovieListsResponse>(initialMovieLists);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (!isAuth) {
      setFavorites([]);
      handleOpenModal(true);
      return;
    }
    handleOpenModal(false);
    getFavorites().then((response) => {
      setFavorites(response);
    });
  }, [isAuth]);

  useEffect(() => {
    if (favorites.length === 0) return;
    handleIsLoadingScreen(true);
    Promise.all(favorites.map((id) => getDetailsMovies({ id })))
      .then((responseDetailsMovies) => {
        const fixData = responseDetailsMovies.map((movie) => ({
          adult: movie.adult,
          backdrop_path: movie.backdrop_path,
          genre_ids: movie.genres.map((genre) => genre.id),
          id: movie.id,
          original_language: movie.original_language,
          original_title: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          title: movie.title,
          video: movie.video,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
        }));
        setDetailsMovie({
          page: 1,
          results: fixData,
          total_pages: 1,
          total_results: responseDetailsMovies.length,
        });
      })
      .finally(() => {
        handleIsLoadingScreen(false);
      });
  }, [favorites]);

  if (!isAuth) {
    return <Loading />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.movies}>
          <ListMovies
            title="Favorites"
            movies={detailsMovie}
            favorites={favorites}
            wrap={false}
          />
        </div>
      </div>
    </main>
  );
}
