import { Dispatch, MiddlewareAPI } from "redux";
import { API_REQUEST } from "./consts";
import { axios } from "@services/axios";
import { ApiRequestAction } from "./actions";
import { httpRequest } from "../http-request/actions";

interface Action {
  type: string;
  payload: any;
}

export const handleApiRequest = (
  {dispatch}: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== API_REQUEST) return next(action);

  const {
    payload: {options, effects},
  } = action as ApiRequestAction;

  return dispatch(httpRequest(options, effects));
}