import { postRequest } from "../http-request"
import { Effects } from "../http-request/actions"
import { SignInPayload, SignUpPayload } from "@state/reducers/auth/auth-operations";
import { getApiRequest } from "../api-request";

export const signIn = (
    data: SignInPayload, 
    effects?: Effects<string>
) => postRequest({url: '/auth/signin', data}, effects);

export const validateName = (
    name: string, 
    effects?: Effects<void>
) => postRequest({url: '/auth/validate-name', data: {name}}, effects);

export const validateEmail = (
    email: string, 
    effects?: Effects<void>
) => postRequest({url: '/auth/validate-email', data: {email}}, effects);

export const signUp = (
    data: SignUpPayload, 
    effects?: Effects<string>
) => postRequest({url: '/auth/signup', data}, effects);

export const validateToken = (
    effects?: Effects<void>
) => getApiRequest({url: '/auth/validate-token'}, effects);