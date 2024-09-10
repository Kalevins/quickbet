import { apiClient } from "@/utils";
import type { GenresResponse } from "@/types";

export const getGenres = async (): Promise<GenresResponse> => {
  const { data } = await apiClient.get(`genre/movie/list`);
  return data as GenresResponse;
};
