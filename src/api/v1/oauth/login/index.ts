/**
 * LOGIN API
 * @path - /api/v1/oauth/login
 */

import instance from "@api/_instance";

interface LoginRequestBody {
  authorizationCode: string;
  identityToken: string;
}

export const LOGIN_API_PATH = "api/v1/oauth/login";

/**
 * @method POST
 */
export const postLogin = (body: LoginRequestBody) =>
  instance.post(`/${LOGIN_API_PATH}`, body);
