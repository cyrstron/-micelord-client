import {AppState} from '../..';

export const getIsPending = (state: AppState) => state.auth.isPending;
export const getAuthToken = (state: AppState) => state.auth.authToken;
export const getError = (state: AppState) => state.auth.error;