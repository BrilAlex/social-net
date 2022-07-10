import {APIResponseType, axiosInstance} from "./api";

export type PhotosType = {
  small: string | null
  large: string | null
};
export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type ProfileType = {
  userId: number
  fullName: string
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  photos: PhotosType
  contacts: ContactsType
};
type ProfilePhotoResponseDataType = {
  photos: PhotosType
};

export const profileAPI = {
  getUserProfile(user_ID: number) {
    return axiosInstance
      .get<ProfileType>(`profile/${user_ID}`)
      .then(response => response.data);
  },
  getUserStatus(user_ID: number) {
    return axiosInstance
      .get<string>(`profile/status/${user_ID}`)
      .then(response => response.data);
  },
  updateUserStatus(newStatus: string) {
    return axiosInstance
      .put<APIResponseType>("profile/status", {status: newStatus})
      .then(response => response.data);
  },
  saveUserAvatar(photoFile: File) {
    const requestData = new FormData();
    requestData.append("image", photoFile);

    return axiosInstance
      .put<APIResponseType<ProfilePhotoResponseDataType>>(
        "profile/photo",
        requestData,
        {headers: {"Content-type": "multipart/form-data"}},
      )
      .then(response => response.data);
  },
  saveUserProfile(profile: ProfileType) {
    return axiosInstance
      .put<APIResponseType>("profile", profile)
      .then(response => response.data);
  },
};
