import { Dispatch, MiddlewareAPI } from "redux";

interface Action {
  type: string;
  payload: any;
}

export const handlePromise = (
  {dispatch}: MiddlewareAPI
) => (
  next: Dispatch
) => async (
  action: Action
) => {
  if (!(action.payload instanceof Promise)) return next(action);

  await action.payload.then(dispatch);
}