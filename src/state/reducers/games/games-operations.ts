import { Dispatch } from "redux";
import { AppState } from "@state/index";
import { 
  fetchGamesPending, 
  fetchGamesSuccess, 
  fetchGamesFailure, 
  fetchCurrentGamePending, 
  fetchCurrentGameSuccess,
  fetchCurrentGameFailure,
  resetCurentGame,
} from "./games-actions";
import { getAllGames, getGameById } from "@state/actions/games-requests/actions";

export const fetchGames = () => async (
  dispatch: Dispatch, 
  getState: () => AppState,
) => {
  const onPending = fetchGamesPending();

  dispatch(onPending);

  try {
    const games = await getAllGames(getState);

    const onSuccess = fetchGamesSuccess(games);

    dispatch(onSuccess);
  } catch (err) {
    const onFailure = fetchGamesFailure(err);

    dispatch(onFailure);
  }
}

export const fetchCurrentGame = (gameId: string) => async (
  dispatch: Dispatch, 
  getState: () => AppState,
) => {
  const onPending = fetchCurrentGamePending();

  dispatch(onPending);

  try {
    const game = await getGameById(gameId, getState);

    const onSuccess = fetchCurrentGameSuccess(game);

    dispatch(onSuccess);
  } catch (err) {
    const onFailure = fetchCurrentGameFailure(err);

    dispatch(onFailure);
  }
}

export {resetCurentGame};
