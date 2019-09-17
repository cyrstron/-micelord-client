import {Dispatch} from 'redux';
import {axios, setAuth} from '@services/axios';
import {
  setPending, 
  setToken, 
  setError, 
  resetError, 
  resetToken
} from './auth-actions';

export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
}

export const signUp = (dispatch: Dispatch) => async (user: SignUpPayload) => {
  try {
    dispatch(setPending(true));

    await axios.post('/signup', user);

    dispatch(setPending(false));
  } catch (err) {
    dispatch(setError(err));
  }
};

export interface SignInPayload {
  email: string;
  password: string;
}

export const signIn = (dispatch: Dispatch) => async (user: SignInPayload) => {
  try {
    dispatch(setPending(true));

    const {data: token} = await axios.post<string>('/signin', user);

    setAuth(token);
    
    dispatch(setToken(token));
  } catch (err) {
    dispatch(setError(err));
  }
};
