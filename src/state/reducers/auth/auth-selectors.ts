import {AppState} from '../..';

export const getCurrentUserError = (state: AppState) => state.auth.getCurrentUserError;
export const getSignInError = (state: AppState) => state.auth.signInError;
export const getSignUpError = (state: AppState) => state.auth.signUpError;

export const getAuthToken = (state: AppState) => state.auth.authToken;

export const getCurrentUser = (state: AppState) => state.auth.currentUser;

export const getCurrentUserName = (state: AppState) => (getCurrentUser(state) || {}).name;
export const getCurrentUserId = (state: AppState) => (getCurrentUser(state) || {})._id;
export const getCurrentUserEmail = (state: AppState) => (getCurrentUser(state) || {}).email;

export const getCurrentUserPending = (state: AppState) => state.auth.isGetCurrentUserPending;
export const getSignInPending = (state: AppState) => state.auth.isSignInPending;
export const getSignUpPending = (state: AppState) => state.auth.isSignUpPending;

export const getAuthPending = (state: AppState) => (
    getCurrentUserPending(state) || 
    getSignInPending(state) || 
    getSignUpPending(state)
);

export const getAuthError = (state: AppState) => (
    getCurrentUserError(state) || 
    getSignInError(state) || 
    getSignUpError(state)
);