import {State} from '../';

export const getIsPending = (state: State) => state.auth.isPending;
export const getAuthToken = (state: State) => state.auth.authToken;
export const getError = (state: State) => state.auth.error;