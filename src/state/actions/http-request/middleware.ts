import { Dispatch, MiddlewareAPI } from "redux";
import { HTTP_REQUEST } from "./consts";
import { HttpAction, Effects } from "./actions";
import { axios } from "@services/axios";

interface Action {
  type: string;
  payload: any;
}

export const handleHttpRequest = (
  {dispatch}: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== HTTP_REQUEST) return next(action);

  const {
    payload: {
      effects: {reject, resolve, pending} = {} as Effects,
      options,
    },
  } = action as HttpAction;

  if (pending) {
    dispatch(pending());
  }

  try {
    const {data} = await axios.request(options);

    if (!resolve) return data;
    
    return dispatch(resolve(data));
  } catch (err) {
    if (!reject) throw err;

    return dispatch(reject(err));
  }
}