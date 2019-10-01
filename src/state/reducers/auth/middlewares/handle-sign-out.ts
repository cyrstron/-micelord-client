import { Dispatch, MiddlewareAPI } from "redux";
import { RESET_TOKEN } from "../auth-consts";
import { Action } from "@state/index";

export const handleSignIn = (
  _store: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== RESET_TOKEN) return next(action);

  localStorage.removeItem('authToken');

  return next(action);
}