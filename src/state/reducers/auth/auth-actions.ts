import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GET_CURRENT_USER_PENDING,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  VALIDATE_TOKEN_PENDING,
  VALIDATE_TOKEN_SUCCESS,
  SIGN_OUT,
} from './auth-consts';

import { User } from '@state/actions/users-requests/actions';

export const signUpOnPending = () => ({
  type: SIGN_UP_PENDING,
});

export const signUpOnSuccess = () => ({
  type: SIGN_UP_SUCCESS,
});

export const signUpOnFailure = (err: Error) => ({
  type: SIGN_UP_FAILURE,
  payload: err,
});

export const signInOnPending = () => ({
  type: SIGN_IN_PENDING,
});

export const signInOnSuccess = (authToken: string) => ({
  type: SIGN_IN_SUCCESS,
  payload: authToken,
});

export const signInOnFailure = (err: Error) => ({
  type: SIGN_IN_FAILURE,
  payload: err,
});

export const getCurrentUserOnPending = () => ({
  type: GET_CURRENT_USER_PENDING,
});

export const getCurrentUserOnSuccess = (user: User) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getCurrentUserOnFailure = (err: Error) => ({
  type: GET_CURRENT_USER_FAILURE,
  payload: err,
});

export const validateTokenOnPending = () => ({
  type: VALIDATE_TOKEN_PENDING,
});

export const validateTokenOnSuccess = () => ({
  type: VALIDATE_TOKEN_SUCCESS,
});

export const signOut = () => ({
  type: SIGN_OUT,
});
