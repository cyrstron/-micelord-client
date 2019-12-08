import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';

import thunk from 'redux-thunk';

import {
  AuthState,
  authReducer,
  authMiddlewares,
} from './reducers/auth';

import {rootReducer, RootState} from './reducers/root';

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
    thunk,
    // handleApiRequest,
    // handleHttpRequest,
    ...authMiddlewares
  ),
);
