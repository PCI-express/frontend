import { httpClient } from "../http-client";
import { AuthResponse, UserRequestData } from "../../helpers";

const SLUG = 'auth/'

export const login = (data: UserRequestData) => {
    const response = httpClient.post<AuthResponse>(SLUG + 'login/', data)
    return response;
}

export const registration = (data: UserRequestData) => {
    const response = httpClient.post<AuthResponse>(SLUG + 'registration/', data);
    return response;
}

export const getProfile = () => {
    const response = httpClient.get<UserRequestData>(SLUG + 'profile/');
    return response;
}

export const patchProfile = (data:  UserRequestData) => {
    const response = httpClient.patch(SLUG + 'profile/', data);
    return response;
}

export const logout = (refresh: string) => {
    const response = httpClient.post(`${SLUG}logout/`, {'refresh_token': refresh});
    return response;
}