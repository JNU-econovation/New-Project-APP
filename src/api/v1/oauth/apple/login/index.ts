/**
 * LOGIN API
 * @path - /api/v1/oauth/apple/login
 */

import publicApi from "@api/_instance/publicApi";

interface LoginRequestBody {
  identityToken: string;
  email: string;
  fullName: {
    familyName: string;
    givenName: string;
  };
}

export const LOGIN_API_PATH = `${process.env.EXPO_PUBLIC_BASE_URL}api/v1/oauth/apple/login`;

/**
 * @method POST
 */
export const postLogin = async (body: LoginRequestBody) =>
  await publicApi.post(`/${LOGIN_API_PATH}`, body);
