import {AppState} from '../..';

export const selectCurrentUserError = (state: AppState) => state.auth.currentUserError;
export const selectSignInError = (state: AppState) => state.auth.signInError;

export const selectAuthToken = (state: AppState) => state.auth.authToken;
export const selectIsAuthTokenValidated = (state: AppState) => state.auth.isAuthTokenValidated;
export const selectNeedTokenValidation = (state: AppState) => (
  !!selectAuthToken(state) &&
  !selectIsAuthTokenValidated(state)
);
export const selectIsAuthenticated = (state: AppState) => (
  !!selectAuthToken(state) && 
  selectIsAuthTokenValidated(state) === true
);

export const selectCurrentUser = (state: AppState) => state.auth.currentUser;

export const selectCurrentUserName = (state: AppState) => (selectCurrentUser(state) || {}).name;
export const selectCurrentUserId = (state: AppState) => (selectCurrentUser(state) || {})._id;
export const selectCurrentUserEmail = (state: AppState) => (selectCurrentUser(state) || {}).email;

export const selectCurrentUserPending = (state: AppState) => state.auth.isGetCurrentUserPending;
export const selectSignInPending = (state: AppState) => state.auth.isSignInPending;
export const selectValidateTokenPending = (state: AppState) => state.auth.isValidateTokenPending;

export const selectAuthPending = (state: AppState) => (
  selectCurrentUserPending(state) || 
  selectSignInPending(state) ||
  selectValidateTokenPending(state)
);

export const selectAuthError = (state: AppState) => (
  selectCurrentUserError(state) || 
  selectSignInError(state)
);