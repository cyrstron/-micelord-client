import { Dispatch, MiddlewareAPI } from "redux";
import { SIGN_IN_SUCCESS } from "../auth-consts";
import { Action } from "@state/index";

export const handleSignIn = (
  _store: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== SIGN_IN_SUCCESS) return next(action);

  const {
    payload,
  } = action;

  localStorage.setItem('authToken', payload as string);

  return next(action);
}