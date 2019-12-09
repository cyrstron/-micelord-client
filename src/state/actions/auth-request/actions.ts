import { postRequest } from "../http-request/actions";
import { SignInPayload } from "@state/reducers/auth/auth-operations";
import { getApiRequest } from "../api-request/actions";
import { AppState } from "@state/index";

export const signInRequest = (
    data: SignInPayload, 
) => postRequest<string>({url: '/auth/signin', data});

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
    } | {
        name: string,
        googleToken: string,
    }, 
) => postRequest<void>({url: '/auth/signup', data});

export const validateTokenRequest = (
    getState: () => AppState
) => getApiRequest<void>({url: '/auth/validate-token'}, getState);