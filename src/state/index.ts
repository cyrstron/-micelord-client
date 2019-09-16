import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';

import {
  AuthState,
  authReducer,
} from './auth';

import {rootReducer, RootState} from './root';

export interface Action<
  Type = string, 
  Payload = any
> {
  type: Type;
  payload?: Payload;
}

export interface State {
  root: RootState;
  auth: AuthState;
}

export const configureStore = (): Store<State, Action> => createStore(
  combineReducers<State, Action>({
    root: rootReducer,
    auth: authReducer,
  }),
  applyMiddleware(),
);
