import { apiClient } from "@/utils";
import type { SearchRequest, KeywordsSearchResponse } from "@/types";

export const getKeywordsSearch = async (
  { query, page }: SearchRequest = { query: "", page: 1 },
): Promise<KeywordsSearchResponse> => {
  const { data } = await apiClient.get(
    `search/keyword?query=${query}&page=${page}`,
  );
  return data as KeywordsSearchResponse;
};
