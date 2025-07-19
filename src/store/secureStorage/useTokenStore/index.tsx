import { create } from "zustand";

interface TokensStore {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiredTime: number | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  // setAccessTokenExpiredTime: (time: string) => void;
  setAccessTokenExpiredTime: (time: number) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokensStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  accessTokenExpiredTime: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  setRefreshToken: (token: string) => set({ refreshToken: token }),
  setAccessTokenExpiredTime: (time: number) =>
    set({ accessTokenExpiredTime: time }),
  clearTokens: () =>
    set({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiredTime: null,
    }),
}));
