import { backClient } from "@/utils";
import type { LoginRequest, LoginResponse } from "@/types";

export const login = async ({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const { data } = await backClient.post(`auth/login`, { username, password });
  return data as LoginResponse;
};

export const register = async ({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const { data } = await backClient.post(`auth/register`, {
    username,
    password,
  });
  return data as LoginResponse;
};

export const logout = async (): Promise<void> => {
  await backClient.post(`auth/logout`);
};

export const validate = async (): Promise<LoginResponse> => {
  const { data } = await backClient.get(`auth/validate`);
  return data as LoginResponse;
};
