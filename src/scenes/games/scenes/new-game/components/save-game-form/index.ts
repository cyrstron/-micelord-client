import {SaveGameForm as SaveGameFormComponent} from './save-game-form';
import { GamePayload, createGame } from '@state/actions/games-requests/actions';
import { connect } from 'react-redux';
import {AppDispatch } from '@state/index';

const mapDispatchToProps = (
  dispatch: AppDispatch
) => ({
  createGame: async (game: GamePayload) => dispatch(async (
    _dispatch,
    getState,
  ) => {
    const {_id} = await createGame(game, getState);

    return _id;
  })
})

const SaveGameForm = connect(
  null, 
  mapDispatchToProps
)(SaveGameFormComponent);

export {SaveGameForm};