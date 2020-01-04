import {CurrentGame as CurrentGameComponent} from './current-game';
import { withRouter } from 'react-router-dom';
import { AppState } from '@state/index';
import { selectCurrentGame, selectCurrentGamePending, selectCurrentGameError } from '@state/reducers/games/games-selectors';
import { connect } from 'react-redux';
import { fetchCurrentGame, resetCurentGame } from '@state/reducers/games/games-operations';

const mapStateToProps = (state: AppState) => ({
  game: selectCurrentGame(state),
  isPending: selectCurrentGamePending(state),
  error: selectCurrentGameError(state),
})

export const CurrentGame = connect(mapStateToProps, {
  fetchGame: fetchCurrentGame,
  resetGame: resetCurentGame,
})(withRouter(CurrentGameComponent));
