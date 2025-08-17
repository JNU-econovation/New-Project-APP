import {
  getRandomNickname,
  RANDOM_NICKNAME_API_PATH,
} from "@api/v1/users/nickname/random";
import { useSuspenseQuery } from "@tanstack/react-query";

const useRandomNicknameQuery = () => {
  const query = useSuspenseQuery({
    queryKey: [RANDOM_NICKNAME_API_PATH],
    queryFn: getRandomNickname,
  });

  return query;
};

export default useRandomNicknameQuery;
