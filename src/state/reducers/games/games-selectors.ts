import { AppState } from "@state/index";
import { Game } from "@state/actions/games-requests/actions";

export const selectCurrentGame = (
  state: AppState
): Game | undefined => state.games.currentGame;

export const selectGames = (
  state: AppState
): Game[] => state.games.games;

export const selectCurrentGamePending = (
  state: AppState
): boolean => state.games.isPending;

export const selectGamesPending = (
  state: AppState
): boolean => state.games.isPending;

export const selectCurrentGameError = (
  state: AppState
): Error | undefined => state.games.error;

export const selectGamesError = (
  state: AppState
): Error | undefined => state.games.error;
