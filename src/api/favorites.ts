import { backClient } from "@/utils";
import type { AddFavoriteRequest, AddFavoriteResponse } from "@/types";

export const addFavorite = async ({
  movieId,
}: AddFavoriteRequest): Promise<AddFavoriteResponse> => {
  const { data } = await backClient.post(`favorites/add`, {
    movieId,
  });
  return data as AddFavoriteResponse;
};

export const getFavorites = async (): Promise<number[]> => {
  const { data } = await backClient.get(`favorites/get`);
  return data as number[];
};
