
import { Response } from "express";

interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

export const setAuthCookie = (res: Response, tokenInfo: TokenInfo) => {
  res.cookie("accessToken", tokenInfo.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", tokenInfo.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
