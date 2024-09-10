import type { Genre, Movie, Keyword, MovieDetails } from "@/types";

export interface ErrorResponse {
  message: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface MovieListsResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface DiscoverResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends MovieDetails {}

export interface MovieKeywordsResponse {
  id: number;
  keywords: Keyword[];
}

export interface LoginResponse {
  userId: number;
  access_token: string;
}

export interface KeywordsSearchResponse {
  page: number;
  results: Keyword[];
  total_pages: number;
  total_results: number;
}

export interface AddFavoriteResponse {
  userId: number;
  movieId: number;
}
