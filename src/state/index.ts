import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';

import thunk, { ThunkDispatch } from 'redux-thunk';

import {
  AuthState,
  authReducer,
  authMiddlewares,
} from './reducers/auth';

import {rootReducer, RootState} from './reducers/root';
import {gamesReducer, GamesState } from './reducers/games';

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
  games: GamesState;
}

export type AppDispatch = ThunkDispatch<AppState, undefined, Action>;

export const configureStore = (): Store<AppState, Action> => createStore(
  combineReducers<AppState, Action>({
    root: rootReducer,
    auth: authReducer,
    games: gamesReducer,
  }),
  applyMiddleware(
    thunk,
    // handleApiRequest,
    // handleHttpRequest,
    ...authMiddlewares
  ),
);
