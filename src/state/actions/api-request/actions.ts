import { API_REQUEST } from "./consts";
import { 
  HttpRequestPayload, 
  HttpRequestOptions, 
  Effects, 
  RequestOptions
} from "../http-request/actions";
import { Action } from "@state/index";

export interface ApiHttpRequestPayload extends HttpRequestPayload {};

export type ApiRequestAction = {
  type: typeof API_REQUEST,
  payload: ApiHttpRequestPayload
};

export const apiRequest = (
  options: HttpRequestOptions,
  effects?: Effects
): Action<string, HttpRequestPayload> => ({
  type: API_REQUEST,
  payload: {
    options,
    effects
  }
});

export const getApiRequest = (  
  options: RequestOptions,
  effects?: Effects
) => apiRequest({
  ...options,
  method: 'GET'
}, effects);

export const postApiRequest = (  
  options: HttpRequestOptions,
  effects?: Effects
) => apiRequest({
  ...options,
  method: 'POST'
}, effects);

export const putApiRequest = (  
  options: HttpRequestOptions,
  effects?: Effects
) => apiRequest({
  ...options,
  method: 'PUT'
}, effects);

export const deleteApiRequest = (  
  options: RequestOptions,
  effects?: Effects
) => apiRequest({
  ...options,
  method: 'DELETE'
}, effects);
