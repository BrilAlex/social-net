import {APIResponseType, axiosInstance, ResultCode, ResultCodeForCaptcha} from "./api";

export type MeResponseDataType = {
  id: number
  email: string
  login: string
};

export const authAPI = {
  me() {
    return axiosInstance
      .get<APIResponseType<MeResponseDataType>>("auth/me")
      .then(response => response.data);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
    return axiosInstance
      .post<APIResponseType<{ userId: number }, ResultCode | ResultCodeForCaptcha>>(
        "auth/login",
        {email, password, rememberMe, captcha},
      )
      .then(response => {
        return response.data;
      });
  },
  logout() {
    return axiosInstance
      .delete<APIResponseType>("auth/login")
      .then(response => response.data);
  },
};
