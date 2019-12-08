import { getApiRequest } from "../api-request/actions";
import { AppState } from "@state/index";

export interface User {
    email: string;
    name: string;
    _id: string;
}

export const getCurrentUserRequest = (getState: () => AppState) => getApiRequest<User>(
    {url: '/api/users/current'},
    getState
);