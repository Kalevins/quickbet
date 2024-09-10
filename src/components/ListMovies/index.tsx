import { CardMovie, Loading } from "@/components";
import { handleScrollX } from "@/utils";
import type { MovieListsResponse } from "@/types";
import styles from "./styles.module.css";

interface ListMoviesProps {
  title: string;
  movies: MovieListsResponse;
  favorites: number[];
  wrap?: boolean;
  isLoading?: boolean;
  handleNextPage?: () => void;
}

export function ListMovies({
  title,
  movies,
  favorites,
  wrap = true,
  isLoading = false,
  handleNextPage = (): void => {},
}: ListMoviesProps): JSX.Element {
  return (
    <div className={styles.category}>
      <h4>{title}</h4>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={styles.moviesListContainer}
          id={wrap ? "" : styles.wrap}
          onScroll={(event) => handleScrollX(event, handleNextPage)}
        >
          <div className={styles.moviesList}>
            {movies.results.map((movie, index) => (
              <CardMovie
                key={index}
                id={movie.id}
                title={movie.title}
                date={movie.release_date}
                image={movie.poster_path}
                isFavorite={favorites.includes(movie.id)}
                rating={movie.vote_average}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
