import { apiClient } from "@/utils";
import type {
  MovieResponse,
  MovieRequest,
  MovieListsResponse,
  MovieKeywordsResponse,
} from "@/types";

export const getDetailsMovies = async ({
  id,
}: MovieRequest): Promise<MovieResponse> => {
  const { data } = await apiClient.get(`movie/${id}`);
  return data as MovieResponse;
};

export const getMovieKeywords = async ({
  id,
}: MovieRequest): Promise<MovieKeywordsResponse> => {
  const { data } = await apiClient.get(`movie/${id}/keywords`);
  return data as MovieKeywordsResponse;
};

export const getRecommendationsMovies = async ({
  id,
}: MovieRequest): Promise<MovieListsResponse> => {
  const { data } = await apiClient.get(`movie/${id}/recommendations`);
  return data as MovieListsResponse;
};
