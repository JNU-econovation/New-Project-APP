import {
  setValueToSecureStore,
  removeValueFromSecureStore,
} from "@utils/secureStore";
import { create } from "zustand";

interface TokensStore {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiredTime: number | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setAccessTokenExpiredTime: (time: number) => void;
  clearTokens: () => void;
}

let prevAccessToken: string | null = null;
let prevRefreshToken: string | null = null;
let prevAccessTokenExpiredTime: number | null = null;

/**
 * 주의!! secure store에 접근하는 사이드 이팩트를 포함하고있습니다!!!
 *
 * 해당 store는 토큰을 관리하는 store입니다.
 * secureStorage에 저장된 토큰을 관리하며, 토큰을 설정하거나 초기화하는 기능을 제공합니다.
 */
export const useTokenStore = create<TokensStore>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  accessTokenExpiredTime: null,
  setAccessToken: (token: string) => {
    prevAccessToken = get().accessToken;
    set({ accessToken: token });
    setValueToSecureStore("accessToken", token).catch(() =>
      set({ accessToken: prevAccessToken }),
    );
  },
  setRefreshToken: (token: string) => {
    prevRefreshToken = get().refreshToken;
    set({ refreshToken: token });
    setValueToSecureStore("refreshToken", token).catch(() =>
      set({ refreshToken: prevRefreshToken }),
    );
  },
  setAccessTokenExpiredTime: (time: number) => {
    prevAccessTokenExpiredTime = get().accessTokenExpiredTime;
    set({ accessTokenExpiredTime: time });
    setValueToSecureStore("accessTokenExpiredTime", `${time}`).catch(() =>
      set({ accessTokenExpiredTime: prevAccessTokenExpiredTime }),
    );
  },
  clearTokens: () => {
    set({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiredTime: null,
    });

    Promise.all([
      removeValueFromSecureStore("accessToken"),
      removeValueFromSecureStore("refreshToken"),
      removeValueFromSecureStore("accessTokenExpiredTime"),
    ]).catch(() => {
      // secure store 삭제 실패 시 로그만 출력하고 상태는 유지
      console.warn("Failed to clear tokens from secure store");
    });
  },
}));
