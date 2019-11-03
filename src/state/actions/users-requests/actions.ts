import { getApiRequest } from "../api-request";
import { Effects } from "../http-request/actions";

export interface User {
    email: string;
    name: string;
    _id: string;
}

export const getCurrentUser = (effects?: Effects<User>) => getApiRequest(
    {url: '/api/users/current'}, 
    effects
);