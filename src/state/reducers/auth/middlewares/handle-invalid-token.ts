import { Dispatch, MiddlewareAPI } from "redux";
import { VALIDATE_TOKEN_FAILURE } from "../auth-consts";
import { signOut } from "../auth-actions";
import { Action } from "@state/index";

export const handleInvalidToken = (
  {dispatch}: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (action.type !== VALIDATE_TOKEN_FAILURE) return next(action);

  dispatch(signOut())

  return next(action);
}