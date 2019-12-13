import { postRequest } from "../http-request/actions";
import { SignInPayload } from "@state/reducers/auth/auth-operations";
import { getApiRequest } from "../api-request/actions";
import { AppState } from "@state/index";

export interface FacebookAuthData {
    email: string;
    facebookToken: string;
};

export interface GoogleAuthData {
    googleToken: string;
};
  
export type ExternalAuthData = FacebookAuthData | GoogleAuthData;

export type AuthStrategy = 'google' | 'facebook' | 'default';
  
export const signInRequest = (
    data: SignInPayload, 
) => {
    let authStrategy: AuthStrategy;

    if ('googleToken' in data) {
        authStrategy = 'google';
    } else if ('facebookToken' in data) {
        authStrategy = 'facebook';
    } else {
        authStrategy = 'default';
    }

    return postRequest<string>({
        url: `/auth/signin?strategy=${authStrategy}`, 
        data
    });
};

export const validateNameRequest = (
    name: string, 
) => postRequest<void>({url: '/auth/validate-name', data: {name}});

export const validateEmailRequest = (
    email: string,
) => postRequest<void>({url: '/auth/validate-email', data: {email}});

export const signUpRequest = (
    data: {
        email: string,
        password: string,
        name: string
    } | ExternalAuthData & {
        name: string,
    }, 
) => {    
    let authStrategy: AuthStrategy;

    if ('googleToken' in data) {
        authStrategy = 'google';
    } else if ('facebookToken' in data) {
        authStrategy = 'facebook';
    } else {
        authStrategy = 'default';
    }
    
    return postRequest<void>({
        url: `/auth/signup?strategy=${authStrategy}`, 
        data
    });
};

export const validateTokenRequest = (
    getState: () => AppState
) => getApiRequest<void>({url: '/auth/validate-token'}, getState);