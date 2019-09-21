import {Dispatch} from 'redux';
import {axios, setAuth} from '@services/axios';
import {
  setPending, 
  setToken, 
  setError, 
  resetError, 
  resetToken
} from './auth-actions';
import { localStorage } from '@services/local-storage';

export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
}

export const createSignUp = (dispatch: Dispatch) => async (user: SignUpPayload) => {
  try {
    dispatch(setPending(true));

    await axios.post('/auth/signup', user);

    dispatch(setPending(false));
  } catch (err) {
    dispatch(setError(err));
  }
};

export interface SignInPayload {
  email: string;
  password: string;
}

export const createSignIn = (dispatch: Dispatch) => async (user: SignInPayload) => {
  try {
    dispatch(setPending(true));

    const {data: token} = await axios.post<string>('/auth/signin', user);

    setAuth(token);
    
    dispatch(setToken(token));
    localStorage.setItem('authToken', token);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const createSignOut = (dispatch: Dispatch) => () => {
  dispatch(resetToken());

  localStorage.removeItem('authToken');
};
