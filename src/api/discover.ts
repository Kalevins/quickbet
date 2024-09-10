import { apiClient } from "@/utils";
import type { DiscoverResponse, DiscoverRequest } from "@/types";

export const getDiscoverMovies = async (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  { page, with_genres, with_keywords }: DiscoverRequest = { page: 1 },
): Promise<DiscoverResponse> => {
  let url = `discover/movie?page=${page}`;
  if (with_genres) {
    url = `${url}&with_genres=${with_genres}`;
  }
  if (with_keywords) {
    url = `${url}&with_keywords=${with_keywords}`;
  }
  const { data } = await apiClient.get(url);
  return data as DiscoverResponse;
};
