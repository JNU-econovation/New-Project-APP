import { removeValueFromSecureStore } from "@utils/secureStore";

const useLogout = () => {
  const logout = async () => {
    await removeValueFromSecureStore("accessToken");
  };

  return { logout };
};

export default useLogout;
