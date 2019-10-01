import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';

import {
  AuthState,
  authReducer,
} from './reducers/auth';


import {rootReducer, RootState} from './reducers/root';
import { handleHttpRequest } from './actions/http-request';
import { handleApiRequest } from './actions/api-request';

export interface Action<
  Type = string, 
  Payload = any
> {
  type: Type;
  payload?: Payload;
}

export interface AppState {
  root: RootState;
  auth: AuthState;
}

export const configureStore = (): Store<AppState, Action> => createStore(
  combineReducers<AppState, Action>({
    root: rootReducer,
    auth: authReducer,
  }),
  applyMiddleware(
    handleApiRequest,
    handleHttpRequest,
  ),
);
