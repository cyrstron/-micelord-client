import {
  SET_PENDING,
  SET_TOKEN,
  RESET_TOKEN,
  SET_ERROR,
  RESET_ERROR
} from './auth-consts';

export const setPending = (isPending: boolean) => ({
  type: SET_PENDING,
  payload: isPending,
});

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});

export const resetToken = () => ({
  type: RESET_TOKEN,
});

export const setError = (error: Error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetError = () => ({
  type: RESET_ERROR,
});