import axios from "axios";
import {UserType} from "../redux/usersReducer";
import {ProfileType} from "../redux/profileReducer";

type CommonAPIResponseType<T> = {
  data: T
  resultCode: number
  messages: Array<string>
}

const axiosInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc",
  },
});

type UsersAPIResponseType = {
  items: UserType[]
  totalCount: number
  error: string
};

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return axiosInstance
      .get<UsersAPIResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },
};

type ProfileAPIResponseType = ProfileType;

export const profileAPI = {
  getUserProfile(user_ID: string) {
    return axiosInstance
      .get<ProfileAPIResponseType>(`profile/${user_ID}`)
      .then(response => response.data);
  },
};

type AuthAPIDataType = {
  id: number
  email: string
  login: string
};

export const authAPI = {
  getAuthUser() {
    return axiosInstance
      .get<CommonAPIResponseType<AuthAPIDataType>>("auth/me")
      .then(response => response.data);
  },
};

type FollowAPIDataType = {};

export const followAPI = {
  follow(user_ID: number) {
    return axiosInstance
      .post<CommonAPIResponseType<FollowAPIDataType>>(`follow/${user_ID}`, {})
      .then(response => response.data);
  },
  unfollow(user_ID: number) {
    return axiosInstance
      .delete<CommonAPIResponseType<FollowAPIDataType>>(`follow/${user_ID}`)
      .then(response => response.data);
  },
}