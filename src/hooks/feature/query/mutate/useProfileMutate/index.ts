import { postProfile, USER_PROFILE_API_PATH } from "@api/v1/users/profile";
import { useMutation } from "@tanstack/react-query";

const useProfileMutate = () => {
  const mutation = useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: postProfile,
  });

  return mutation;
};

export default useProfileMutate;
