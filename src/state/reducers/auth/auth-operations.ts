import {Dispatch} from 'redux';
import {
  signInOnFailure,
  signInOnPending,
  signInOnSuccess,
  getCurrentUserOnFailure,
  getCurrentUserOnPending,
  getCurrentUserOnSuccess,
  validateTokenOnFailure,
  validateTokenOnPending,
  validateTokenOnSuccess,
  signOut,
} from './auth-actions';
import { getCurrentUserRequest } from '@state/actions/users-requests/actions';
import { 
  signInRequest, 
  validateTokenRequest
} from '@state/actions/auth-request/actions';
import { AppState } from '@state/index';

export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
}

export const getCurrentUser = () => async (
  dispatch: Dispatch, 
  getState: () => AppState
) => {
  const onPending = getCurrentUserOnPending();

  dispatch(onPending);

  try {    
    const currentUser = await getCurrentUserRequest(getState);

    const onSuccess = getCurrentUserOnSuccess(currentUser);

    dispatch(onSuccess);
  } catch (err) {
    const onFailure = signOut();

    dispatch(onFailure);
  }
}

export interface SignInPayload {
  email: string;
  password: string;
}

export const signIn = (user: SignInPayload) => async (
  dispatch: Dispatch
) => {
  const onPending = signInOnPending();

  dispatch(onPending);

  try {
    const authToken = await signInRequest(user);

    const onSuccess = signInOnSuccess(authToken);

    dispatch(onSuccess);
  } catch (err) {
    const onFailure = signInOnFailure(err);

    dispatch(onFailure);
  }
};

export const validateToken = () => async (
  dispatch: Dispatch, 
  getState: () => AppState
) => {
  const onPending = validateTokenOnPending();

  dispatch(onPending);

  try {
    await validateTokenRequest(getState);

    const onSuccess = validateTokenOnSuccess();

    dispatch(onSuccess);
  } catch (err) {
    const onFailure = validateTokenOnFailure(err);

    dispatch(onFailure);
  }
}

export {signOut};