import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';

export interface Action<T> {
  type: string;
  payload?: T;
}

export interface State {
  root: RootState;
}

import {rootReducer, RootState} from './root';
export const configureStore = (): Store<State, Action<any>> => createStore(
  combineReducers<State, Action<any>>({
    root: rootReducer,
  }),
  applyMiddleware(),
);
