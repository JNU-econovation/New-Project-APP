import { removeValueFromSecureStore } from "@utils/secureStore";

const useLogout = () => {
  const logout = async () => {
    try {
      await removeValueFromSecureStore("accessToken");
    } catch (error) {
      console.error("[useLogout] 로그아웃 중 에러 발생:", error);
      throw error;
    }
  };

  return { logout };
};

export default useLogout;
