import { http } from "./http";
import type { LoginApiResponse } from "../types/api";
import type { StoredAuthUser } from "./tokenStorage";

export async function register(params: {
  username: string;
  email: string;
  password: string;
}) {
  const { username, email, password } = params;

  const res = await http.post("/auth/register", { username, email, password });
  return res.data;
}

export async function login(params: {
  email: string;
  password: string;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  user: StoredAuthUser;
}> {
  const res = await http.post<LoginApiResponse>("/auth/login", params);
  const data = res.data;
  const accessToken = data.accessToken;
  if (!accessToken)
    throw new Error("Login response did not include an access token");

  const rawId = data.user?.id;
  if (rawId === undefined || rawId === null) {
    throw new Error("Login response did not include a user id");
  }

  const user: StoredAuthUser = {
    id: String(rawId),
    username: data.user.username,
    email: data.user.email,
  };

  return { accessToken, refreshToken: data.refreshToken, user };
}
