/**
 * LOGIN API
 * @path - /api/v1/oauth/login
 */

import instance from "@api/_instance";

interface LoginRequestBody {
  authorizationCode: string;
  identityToken: string;
}

export const LOGIN_API_PATH = `${process.env.BASE_URL}api/v1/oauth/login`;

/**
 * @method POST
 */
export const postLogin = async (body: LoginRequestBody) => {
  return await instance.post(`/${LOGIN_API_PATH}`, body);
};
