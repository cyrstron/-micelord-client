import {Dispatch} from 'redux';
import {
  signInOnFailure,
  signInOnPending,
  signInOnSuccess,
  getCurrentUserOnFailure,
  getCurrentUserOnPending,
  getCurrentUserOnSuccess,
  validateTokenOnPending,
  validateTokenOnSuccess,
  signOut,
} from './auth-actions';
import { getCurrentUserRequest, getUserByGoogle, getUserByFacebook } from '@state/actions/users-requests/actions';
import { 
  signInRequest, 
  validateTokenRequest,
  GoogleAuthData,
  FacebookAuthData
} from '@state/actions/auth-request/actions';
import { AppState } from '@state/index';

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
    const onFailure = getCurrentUserOnFailure(err);

    dispatch(onFailure);
  }
}

interface DefaultSignInPayload {
  email: string;
  password: string;
}

export type SignInPayload = DefaultSignInPayload | GoogleAuthData | FacebookAuthData;

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

export const signInWithGoogle = (googleToken: string) => async (
  dispatch: Dispatch
) => {
  const user = await getUserByGoogle(googleToken);

  if (user) {
    await signIn({googleToken})(dispatch);
  }
}

export const signInWithFacebook = (
  email: string, 
  facebookToken: string
) => async (
  dispatch: Dispatch
) => {
  const user = await getUserByFacebook(email, facebookToken);

  if (user) {
    await signIn({email, facebookToken})(dispatch);
  }
}

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
    const onFailure = signOut();

    dispatch(onFailure);
  }
}

export {signOut};