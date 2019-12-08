import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GET_CURRENT_USER_PENDING,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  VALIDATE_TOKEN_SUCCESS,
  SIGN_OUT,
} from './auth-consts';
import {Action} from '../..';
import { localStorage } from '@services/local-storage';
import { User } from '@state/actions/users-requests/actions';


export interface AuthState {
  readonly isSignInPending: boolean;
  readonly isGetCurrentUserPending: boolean;
  readonly isValidateTokenPending: boolean;
  readonly authToken?: string;
  readonly isAuthTokenValidated: boolean;
  readonly currentUser?: User;
  readonly signInError?: Error;
  readonly currentUserError?: Error;
}

const authToken = localStorage.getItem('authToken');

const initialState: AuthState = {
  authToken: authToken || undefined,
  isAuthTokenValidated: false,
  isSignInPending: false,
  isGetCurrentUserPending: false,
  isValidateTokenPending: false,
};

export const authReducer = (
  state: AuthState = initialState, 
  {type, payload}: Action
): AuthState => {
  switch (type) {
    case SIGN_IN_PENDING:
      return {
        ...state,
        signInError: undefined,
        isSignInPending: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignInPending: false,
        isAuthTokenValidated: true,
        authToken: payload,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        signInError: payload,
        isSignInPending: false,
      };
    case GET_CURRENT_USER_PENDING:
      return {
        ...state,
        isGetCurrentUserPending: true,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isGetCurrentUserPending: false,
      };
    case GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        currentUserError: payload,
        isGetCurrentUserPending: false,
      };
    case VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthTokenValidated: true,
        isValidateTokenPending: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthTokenValidated: false,
        isValidateTokenPending: false,
        authToken: undefined,
        currentUser: undefined,
      };
    default:
      return state;
  }
};
