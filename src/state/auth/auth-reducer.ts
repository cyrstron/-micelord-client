import {
  SET_PENDING,
  SET_TOKEN,
  RESET_TOKEN,
  SET_ERROR,
  RESET_ERROR
} from './auth-consts';
import {Action} from '../';

export interface AuthState {
  readonly isPending: boolean;
  readonly authToken?: string;
  readonly error?: Error;
}

const initialState: AuthState = {
  isPending: false,
  authToken: undefined,
  error: undefined,
};

export const authReducer = (
  state: AuthState = initialState, 
  {type, payload}: Action
): AuthState => {
  switch (type) {    
    case SET_PENDING:
      return {
        ...state,
        isPending: payload,
      }
    case SET_TOKEN:
      return {
        ...state,
        authToken: payload,
      }
    case RESET_TOKEN:
      return {
        ...state,
        authToken: undefined,
      }
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      }
    case RESET_ERROR:
      return {
        ...state,
        error: undefined,
      }
    default:
      return state;
  }
};
