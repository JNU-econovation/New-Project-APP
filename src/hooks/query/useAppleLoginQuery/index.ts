import { LOGIN_API_PATH, postLogin } from "@api/v1/oauth/login";
import { useMutation } from "@tanstack/react-query";

const useAppleLoginMutate = () => {
  return useMutation({
    mutationKey: [LOGIN_API_PATH],
    mutationFn: postLogin,
  });
};

export default useAppleLoginMutate;
