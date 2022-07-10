import axios from "axios";

export enum ResultCode {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type APIResponseType<D = {}, RC = ResultCode> = {
  data: D
  resultCode: RC
  messages: Array<string>
}

export const axiosInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc",
  },
});
