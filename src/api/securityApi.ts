import {axiosInstance} from "./api";

type GetCaptchaUrlResponseDataType = {
  url: string
};

export const securityAPI = {
  getCaptchaUrl() {
    return axiosInstance
      .get<GetCaptchaUrlResponseDataType>("security/get-captcha-url")
      .then(response => response.data);
  },
};
