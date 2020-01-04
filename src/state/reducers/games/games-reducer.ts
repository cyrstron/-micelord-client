import {
  FETCH_CURRENT_GAME_FAILURE,
  FETCH_CURRENT_GAME_PENDING,
  FETCH_CURRENT_GAME_SUCCESS,
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_PENDING,
  FETCH_GAMES_SUCCESS,
  RESET_CURRENT_GAME,
} from './games-consts';
import {Action} from '../..';
import { Game } from '@state/actions/games-requests/actions';


export interface GamesState {
  readonly games: Game[];
  readonly currentGame?: Game;
  readonly error?: Error;
  readonly isPending: boolean;
}

const initialState: GamesState = {
  games: [],
  isPending: false,
};

export const gamesReducer = (
  state: GamesState = initialState, 
  {type, payload}: Action
): GamesState => {
  switch (type) {    
    case FETCH_CURRENT_GAME_PENDING:
      return {
        ...state,
        error: undefined,
        isPending: true,
      };
    case FETCH_CURRENT_GAME_FAILURE:
      return {
        ...state,
        isPending: false,
        error: payload as Error,
      };
    case FETCH_CURRENT_GAME_SUCCESS:
      return {
        ...state,
        isPending: false,
        currentGame: payload as Game,
      };
    case FETCH_GAMES_PENDING:
      return {
        ...state,
        isPending: false,
        error: undefined,
      };
    case FETCH_GAMES_FAILURE:
      return {
        ...state,
        error: payload as Error,
        isPending: false,
      };  
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        isPending: false,
        games: payload as Game[],
      };
    case RESET_CURRENT_GAME:
      return {
        ...state,
        currentGame: undefined,
      };
    default:
      return state;
  }
};
