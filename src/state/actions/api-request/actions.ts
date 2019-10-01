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
  payload: HttpRequestPayload
};

export const apiRequest = (
  options: HttpRequestOptions,
  effects: Effects
): Action<string, HttpRequestPayload> => ({
  type: API_REQUEST,
  payload: {
    options,
    effects
  }
});

export const getRequest = (  
  options: RequestOptions,
  effects: Effects
) => apiRequest({
  ...options,
  method: 'GET'
}, effects);

export const postRequest = (  
  options: HttpRequestOptions,
  effects: Effects
) => apiRequest({
  ...options,
  method: 'POST'
}, effects);

export const putRequest = (  
  options: HttpRequestOptions,
  effects: Effects
) => apiRequest({
  ...options,
  method: 'PUT'
}, effects);

export const deleteRequest = (  
  options: RequestOptions,
  effects: Effects
) => apiRequest({
  ...options,
  method: 'DELETE'
}, effects);
