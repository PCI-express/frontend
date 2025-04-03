import { getProfile, login, logout, patchProfile, registration } from "../../api";
import { UserRequestData } from "../../helpers";
import { ServiceRequestData } from "../../helpers/services/type";
import { BaseStore } from "../base";

class UserStore extends BaseStore {
    loginUser = async (data: UserRequestData) => {
        try {
            const response = await login(data);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
        } catch (error) {
            this.getError(error);
        }  
    }

    registrationUser = async (data: UserRequestData) => {
        try {
            const response = await registration(data);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);

        } catch (error) {
            this.getError(error);
        }
    }

    logoutUser = async () => {
        try {
            await logout(localStorage.getItem('refreshToken') || '');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            this.getError(error);
        }
    }

    getProfileUser = async (): Promise<UserRequestData> => {
        try {
            const response = await getProfile();
            return response.data;
        } catch (error) {
            this.getError(error);
            return {};
        }
    }
    
    getDataForServiceRequest = async (): Promise<Partial<ServiceRequestData>> => {
        try {
            const response = await getProfile();
            const dataForServiceRequest = {
                phone_number: response.data.phone_number,
            }
            return dataForServiceRequest;
        } catch (error) {
            this.getError(error);
            return {};
        }
    }
    
    patchUserProfileData = async (data: UserRequestData): Promise<UserRequestData> => {
        try {
            const response = await patchProfile(data);
            return response.data;
        } catch (error) {   
            this.getError(error);
            return {};
        }
    }

    validatePassword = (password1: string, password2: string): boolean => {
        if (password1 != password2){
            this.error = "Passwords don't match";
            this.notifyErrorListeners();
            return false;
        }

        return true;
    }
}

export const User = new UserStore()