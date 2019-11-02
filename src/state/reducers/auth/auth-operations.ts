import {Dispatch} from 'redux';
import {
  signInOnFailure,
  signInOnPending,
  signInOnSuccess,
  signUpOnFailure,
  signUpOnPending,
  signUpOnSuccess,
  getCurrentUserOnFailure,
  getCurrentUserOnPending,
  getCurrentUserOnSuccess,
  signOut
} from './auth-actions';
import { getCurrentUser } from '@state/actions/users-requests/actions';
import { signIn, signUp } from '@state/actions/auth-request/actions';

export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
}

export const createGetCurrentUser = (dispatch: Dispatch) => async () => {
  const action = getCurrentUser({
    resolve: getCurrentUserOnSuccess,
    pending: getCurrentUserOnPending,
    reject: getCurrentUserOnFailure,
  });

  return dispatch(action);
}

export const createSignUp = (dispatch: Dispatch) => async (user: SignUpPayload) => {
  const action = signUp(user, {
    resolve: signUpOnSuccess,
    pending: signUpOnPending,
    reject: signUpOnFailure,
  });

  return dispatch(action);
};

export interface SignInPayload {
  email: string;
  password: string;
}

export const createSignIn = (dispatch: Dispatch) => async (user: SignInPayload) => {
  const action = signIn(user, {
    resolve: signInOnSuccess,
    pending: signInOnPending,
    reject: signInOnFailure,
  });

  return dispatch(action);
};

export const createSignOut = (dispatch: Dispatch) => () => {
  return dispatch(signOut());
};
