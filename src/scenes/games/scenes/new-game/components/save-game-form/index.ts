import {SaveGameForm as SaveGameFormComponent} from './save-game-form';
import { GamePayload, createGame } from '@state/actions/games-requests/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '@state/index';

const mapDispatchToProps = () => ({
  createGame: async (game: GamePayload) => async (
    _dispatch: Dispatch,
    getState: () => AppState
  ) => {
    const {_id} = await createGame(game, getState);

    return _id;
  }
})

const SaveGameForm = connect(
  null, 
  mapDispatchToProps
)(SaveGameFormComponent);

export {SaveGameForm};