import { HTTP_REQUEST } from "./consts";
import { AxiosRequestConfig } from "axios";
import { Action } from "@state/index";

export interface Effects<Result = any, Error = any> {
  pending?: () => Action;
  reject?: (err: Error) => Action<string, Error>;
  resolve?: (result: Result) => Action<string, Result>;
}

export type HttpRequestOptions = AxiosRequestConfig;
export type RequestOptions = Omit<HttpRequestOptions, 'method'>;

export interface HttpRequestPayload {
  options: HttpRequestOptions;
  effects?: Effects;
};

export type HttpAction = {
  type: typeof HTTP_REQUEST, 
  payload: HttpRequestPayload
};

export const httpRequest = (
  options: HttpRequestOptions,
  effects?: Effects
): HttpAction => ({
  type: HTTP_REQUEST,
  payload: {
    options,
    effects
  }
});

export const getRequest = (  
  options: RequestOptions,
  effects?: Effects
) => httpRequest({
  ...options,
  method: 'GET'
}, effects);

export const postRequest = (  
  options: HttpRequestOptions,
  effects?: Effects
) => httpRequest({
  ...options,
  method: 'POST'
}, effects);

export const putRequest = (  
  options: HttpRequestOptions,
  effects?: Effects
) => httpRequest({
  ...options,
  method: 'PUT'
}, effects);

export const deleteRequest = (  
  options: RequestOptions,
  effects?: Effects
) => httpRequest({
  ...options,
  method: 'DELETE'
}, effects);
