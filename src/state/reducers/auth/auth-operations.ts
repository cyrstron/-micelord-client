import {Dispatch} from 'redux';
import {axios, setAuth} from '@services/axios';
import {
  setPending, 
  setToken, 
  setError, 
  resetToken,
  onPending
} from './auth-actions';
import { localStorage } from '@services/local-storage';
import { postRequest } from '@state/actions/http-request';

export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
}

export const createSignUp = (dispatch: Dispatch) => (user: SignUpPayload) => {
  const action = postRequest({
    url: '/auth/signup',
    data: user,
  }, {
    pending: onPending,
    reject: setError,
  });

  return dispatch(action);
};

export interface SignInPayload {
  email: string;
  password: string;
}

export const createSignIn = (dispatch: Dispatch) => async (user: SignInPayload) => {
  const action = postRequest({
    url: '/auth/signin',
    data: user,
  }, {
    resolve: setToken,
    pending: onPending,
    reject: setError,
  });

  return dispatch(action);
};

export const createSignOut = (dispatch: Dispatch) => () => {
  dispatch(resetToken());

  localStorage.removeItem('authToken');
};
