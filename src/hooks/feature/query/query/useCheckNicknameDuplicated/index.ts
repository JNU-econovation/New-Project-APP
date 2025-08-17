import {
  CHECK_NICKNAME_API_PATH,
  getCheckNicknameDuplicated,
} from "@api/v1/users/nickname/check";
import { useSuspenseQuery } from "@tanstack/react-query";

const useCheckNicknameDuplicated = (nickname: string) => {
  return useSuspenseQuery({
    queryKey: [CHECK_NICKNAME_API_PATH(nickname)],
    queryFn: () => getCheckNicknameDuplicated(nickname),
  });
};

export default useCheckNicknameDuplicated;
