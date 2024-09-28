/* eslint-disable @typescript-eslint/no-unused-vars */
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

import TOKEN from "@/lib/constants/token.contants";
import type { DecodedToken, Token, User } from "@/lib/types/auth.type";
// check if client side or server side

const getAccessToken = async (): Promise<string | null | undefined> => {
  try {
    const token = Cookie.get(TOKEN.ACCESS_TOKEN);
    return token || null;
  } catch (error) {
    return null;
  }
};

const getRefreshToken = async (): Promise<string | null | undefined> => {
  try {
    const token = Cookie.get(TOKEN.REFRESH_TOKEN);
    return token || null;
  } catch (error) {
    return null;
  }
};

const getUser = async (): Promise<DecodedToken | null> => {
  try {
    const accessToken = await getAccessToken();
    if (accessToken) {
      const decodedUser = jwtDecode(accessToken) as DecodedToken;
      return decodedUser;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getToken = async (): Promise<Token | null> => {
  try {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (accessToken && refreshToken) {
      return { access: accessToken, refresh: refreshToken };
    }

    return null;
  } catch (error) {
    return null;
  }
};

const updateToken = async (token: Token): Promise<boolean> => {
  try {
    Cookie.set(TOKEN.ACCESS_TOKEN, token.access, { path: "/" });
    Cookie.set(TOKEN.REFRESH_TOKEN, token.refresh, { path: "/" });

    return true;
  } catch (error) {
    return false;
  }
};

const removeUser = (): boolean => {
  try {
    Cookie.remove(TOKEN.ACCESS_TOKEN, { path: "/" });
    Cookie.remove(TOKEN.REFRESH_TOKEN, { path: "/" });
    return true;
  } catch (error) {
    return false;
  }
};

const getUserFromToken = async (
  token: string
): Promise<User | null | undefined> => {
  try {
    const decodedUser = jwtDecode(token) as DecodedToken;
    return decodedUser.user;
  } catch (error) {
    return null;
  }
};
const isTokenExpired = async (token: string): Promise<boolean> => {
  try {
    const decodedUser = jwtDecode(token) as DecodedToken;
    return decodedUser.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const isAccessExpired = async (): Promise<boolean> => {
  try {
    const token = await getAccessToken();
    if (token) {
      return await isTokenExpired(token);
    }
    return true;
  } catch (error) {
    return true;
  }
};

const removeToken = (): boolean => {
  try {
    Cookie.remove(TOKEN.ACCESS_TOKEN, { path: "/" });
    Cookie.remove(TOKEN.REFRESH_TOKEN, { path: "/" });
    return true;
  } catch (error) {
    return false;
  }
};

const TokenService = {
  getAccessToken,
  updateToken,
  removeUser,
  isTokenExpired,
  isAccessExpired,
  getToken,
  getUser,
  getRefreshToken,
  removeToken,
  getUserFromToken,
};

export default TokenService;
