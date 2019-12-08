import { 
  HttpRequestOptions,
  RequestOptions,
  httpRequest
} from "../http-request/actions";
import { AppState } from "@state/index";
import { selectAuthToken } from "@state/reducers/auth/auth-selectors";

export const apiRequest = <Response>(
  options: HttpRequestOptions,
  getState: () => AppState,
) => httpRequest<Response>({
  ...options,
  headers: {
    ...options.headers,
    authorization: selectAuthToken(getState())
  }
});

export const getApiRequest = <Response>(  
  options: RequestOptions,
  getState: () => AppState,
) => apiRequest<Response>({
  ...options,
  method: 'GET'
}, getState);

export const postApiRequest = <Response>(  
  options: HttpRequestOptions,
  getState: () => AppState,
) => apiRequest<Response>({
  ...options,
  method: 'POST'
}, getState);

export const putApiRequest = <Response>(  
  options: HttpRequestOptions,
  getState: () => AppState,
) => apiRequest<Response>({
  ...options,
  method: 'PUT'
}, getState);

export const deleteApiRequest = <Response>(  
  options: RequestOptions,
  getState: () => AppState,
) => apiRequest<Response>({
  ...options,
  method: 'DELETE'
}, getState);
