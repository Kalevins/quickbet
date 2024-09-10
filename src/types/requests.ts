export interface MovieListsRequest {
  page?: number;
}

export interface DiscoverRequest {
  page?: number;
  with_keywords?: number;
  with_genres?: number;
}

export interface MovieRequest {
  id: string | number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SearchRequest {
  query: string;
  page?: number;
}

export interface AddFavoriteRequest {
  movieId: number;
}
