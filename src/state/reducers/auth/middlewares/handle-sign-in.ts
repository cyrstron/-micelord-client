import { Dispatch, MiddlewareAPI } from "redux";
import { SET_TOKEN } from "../auth-consts";
import { Action } from "@state/index";

export const handleSignIn = (
  _store: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== SET_TOKEN) return next(action);

  const {
    payload,
  } = action;

  localStorage.setItem('authToken', payload as string);

  return next(action);
}