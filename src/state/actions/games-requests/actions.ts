import { getApiRequest, postApiRequest } from "../api-request/actions";
import { AppState } from "@state/index";

export interface GamePayload {
  description?: string;
  gridConfig: grider.GridConfig;
  border: grider.GeoPoint[];
  name: string;
}

export interface Game extends GamePayload {
  _id: string;
  createdBy: {
    _id: string;
    name: string;
  }
}

export const getGameById = (gameId: string, getState: () => AppState) => getApiRequest<Game>(
  {url: `/api/games/${gameId}`},
  getState
);

export const getAllGames = (getState: () => AppState) => getApiRequest<Game[]>(
  {url: '/api/games'},
  getState
);

export const createGame = (
  data: GamePayload, 
  getState: () => AppState
) => postApiRequest<{_id: string}>({
    url: '/api/games', 
    data
  },
  getState
);
