import { Dispatch, MiddlewareAPI } from "redux";
import { API_REQUEST } from "./consts";
import { axios } from "@services/axios";
import { ApiRequestAction } from "./actions";
import { httpRequest } from "../http-request/actions";
import { getAuthToken } from "@state/reducers/auth/auth-selectors";

interface Action {
  type: string;
  payload: any;
}

export const handleApiRequest = (
  {dispatch, getState}: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== API_REQUEST) return next(action);

  const authToken = getAuthToken(getState());

  const {
    payload: {
      options, 
      effects
    },
  } = action as ApiRequestAction;

  const httpAction = httpRequest({
      ...options,
      headers: {
        ...options.headers,
        authorization: authToken,
      },
    }, 
    effects
  );

  return dispatch(httpAction);
}