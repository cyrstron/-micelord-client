import { getApiRequest } from "../api-request/actions";
import { AppState } from "@state/index";
import { getRequest } from "../http-request/actions";

export interface User {
    email: string;
    name: string;
    _id: string;
}

export const getCurrentUserRequest = (getState: () => AppState) => getApiRequest<User>(
    {url: '/api/users/current'},
    getState
);

export const getUserByGoogle = (googleToken: string) => getRequest<User | null>({
    url: '/api/users/by-google',
    params: {googleToken}
});

export const getUserByFacebook = (
    email: string, 
    facebookToken: string
) => getRequest<User | null>({
    url: '/api/users/by-facebook',
    params: {email, facebookToken}
});