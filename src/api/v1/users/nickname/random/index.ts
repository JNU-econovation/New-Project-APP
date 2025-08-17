import authenticatedApi from "@api/_instances/authenticatedApi";

export const RANDOM_NICKNAME_API_PATH = `/api/v1/users/nickname/random`;

interface GetRandomNicknameResponse {
  isDuplicated: boolean;
}

export const getRandomNickname = async (nickname: string) => {
  const response = await authenticatedApi<GetRandomNicknameResponse>({
    method: "get",
    url: RANDOM_NICKNAME_API_PATH,
  });

  return response.data;
};
