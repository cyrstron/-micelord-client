import { postRequest } from "../http-request"
import { Effects } from "../http-request/actions"
import { SignInPayload, SignUpPayload } from "@state/reducers/auth/auth-operations";

export const signIn = (
    data: SignInPayload, 
    effects: Effects<string>
) => postRequest({url: '/auth/signin', data}, effects);

export const signUp = (
    data: SignUpPayload, 
    effects: Effects<string>
) => postRequest({url: '/auth/signin', data}, effects);