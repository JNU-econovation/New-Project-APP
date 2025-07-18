import { create } from "zustand";

interface TokensStore {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiredTime: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setAccessTokenExpiredTime: (time: string) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokensStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  accessTokenExpiredTime: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  setRefreshToken: (token: string) => set({ refreshToken: token }),
  setAccessTokenExpiredTime: (time: string) =>
    set({ accessTokenExpiredTime: time }),
  clearTokens: () =>
    set({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiredTime: null,
    }),
}));
