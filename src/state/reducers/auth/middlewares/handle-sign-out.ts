import { Dispatch, MiddlewareAPI } from "redux";
import { SIGN_OUT } from "../auth-consts";
import { Action } from "@state/index";

export const handleSignOut = (
  _store: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== SIGN_OUT) return next(action);

  localStorage.removeItem('authToken');

  return next(action);
}