import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GET_CURRENT_USER_PENDING,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  VALIDATE_TOKEN_PENDING,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAILURE,
  SIGN_OUT,
} from './auth-consts';
import {Action} from '../..';
import { localStorage } from '@services/local-storage';
import { User } from '@state/actions/users-requests/actions';


export interface AuthState {
  readonly isSignInPending: boolean;
  readonly isGetCurrentUserPending: boolean;
  readonly isSignUpPending: boolean;
  readonly isValidateTokenPending: boolean;
  readonly signInError?: Error;
  readonly getCurrentUserError?: Error;
  readonly signUpError?: Error;
  readonly authToken?: string;
  readonly isAuthTokenValid?: boolean;
  readonly error?: Error;
  readonly currentUser?: User;
}

const authToken = localStorage.getItem('authToken');

const initialState: AuthState = {
  isSignInPending: false,
  isGetCurrentUserPending: false,
  isSignUpPending: false,
  isValidateTokenPending: false,
  authToken: authToken || undefined,
};

export const authReducer = (
  state: AuthState = initialState, 
  {type, payload}: Action
): AuthState => {
  switch (type) {    
    case SIGN_UP_PENDING:
      return {
        ...state,
        signUpError: undefined,
        isSignUpPending: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignUpPending: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: payload,
        isSignUpPending: false,
      };
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
        isAuthTokenValid: true,
        authToken: payload,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        signInError: payload,
        isSignUpPending: false,
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
        getCurrentUserError: payload,
        isGetCurrentUserPending: false,
      };
    case VALIDATE_TOKEN_FAILURE:
        return {
          ...state,
          isAuthTokenValid: false,
          isValidateTokenPending: false,
        };
    case VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthTokenValid: true,
        isValidateTokenPending: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthTokenValid: undefined,
        authToken: undefined,
        currentUser: undefined,
      };    
    default:
      return state;
  }
};
