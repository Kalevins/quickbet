import { apiClient } from "@/utils";
import type { MovieListsResponse, MovieListsRequest } from "@/types";

export const getPopularMovies = async (
  { page }: MovieListsRequest = { page: 1 },
): Promise<MovieListsResponse> => {
  const { data } = await apiClient.get(`movie/popular?page=${page}`);
  return data as MovieListsResponse;
};

export const getNowPlayingMovies = async (
  { page }: MovieListsRequest = { page: 1 },
): Promise<MovieListsResponse> => {
  const { data } = await apiClient.get(`movie/now_playing?page=${page}`);
  return data as MovieListsResponse;
};

export const getUpcomingMovies = async (
  { page }: MovieListsRequest = { page: 1 },
): Promise<MovieListsResponse> => {
  const { data } = await apiClient.get(`movie/upcoming?page=${page}`);
  return data as MovieListsResponse;
};

export const getTopRatedMovies = async (
  { page }: MovieListsRequest = { page: 1 },
): Promise<MovieListsResponse> => {
  const { data } = await apiClient.get(`movie/top_rated?page=${page}`);
  return data as MovieListsResponse;
};
