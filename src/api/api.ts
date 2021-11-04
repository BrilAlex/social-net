import axios from "axios";
import {UserType} from "../redux/usersReducer";
import {ProfileType} from "../redux/profileReducer";

type UsersAPIResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type AuthAPIResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: number
    messages: Array<string>
};

type ProfileAPIResponseType = ProfileType

type FollowAPIResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

const axiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc"},
});

export const usersAPI = {
    getUsersData(currentPage: number = 1, pageSize: number = 10) {
        return axiosInstance.get<UsersAPIResponseType>(
            `users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
            return response.data;
        });
    }
};

export const authAPI = {
    getAuthData() {
        return axiosInstance.get<AuthAPIResponseType>(
            "auth/me"
        ).then(response => response.data);
    }
}

export const profileAPI = {
    getProfileData(userID: string) {
        return axiosInstance.get<ProfileAPIResponseType>(
            "https://social-network.samuraijs.com/api/1.0/profile/" + userID
        ).then(response => response.data);
    }
}

export const followAPI = {
    followUser(userID: number){
        return axiosInstance.post<FollowAPIResponseType>(
            `follow/${userID}`
        ).then(response => response.data);
    },
    unfollowUser(userID: number){
        return axiosInstance.delete<FollowAPIResponseType>(
            `follow/${userID}`
        ).then(response => response.data);
    }
}