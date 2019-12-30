import {
  rootPrefix,
  pendingSuffix,
  successSuffix,
  failureSuffix,
} from '../../consts';

export const gamesPrefix = `${rootPrefix}/games`;

export const FETCH_GAMES_PENDING = `${gamesPrefix}/FETCH_GAMES${pendingSuffix}`;
export const FETCH_GAMES_SUCCESS = `${gamesPrefix}/FETCH_GAMES${successSuffix}`;
export const FETCH_GAMES_FAILURE = `${gamesPrefix}/FETCH_GAMES${failureSuffix}`;

export const FETCH_GAME_PENDING = `${gamesPrefix}/FETCH_GAME${pendingSuffix}`;
export const FETCH_GAME_SUCCESS = `${gamesPrefix}/FETCH_GAME${successSuffix}`;
export const FETCH_GAME_FAILURE = `${gamesPrefix}/FETCH_GAME${failureSuffix}`;

