import {APIResponseType, axiosInstance} from "./api";
import {PhotosType} from "./profileApi";

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
};
export type UsersAPIResponseType = {
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

export const followAPI = {
  follow(user_ID: number) {
    return axiosInstance
      .post<APIResponseType>(`follow/${user_ID}`, {})
      .then(response => response.data);
  },
  unfollow(user_ID: number) {
    return axiosInstance
      .delete<APIResponseType>(`follow/${user_ID}`)
      .then(response => response.data);
  },
};
