import { withSmartMapCtx } from 'react-google-maps-ts';

import {Games as GamesComponent, GamesProps} from './games';
import { AppState } from '@state/index';
import { selectCurrentGame } from '@state/reducers/games/games-selectors';
import { connect } from 'react-redux';

const mapStateToProp = (state: AppState) => ({
  currentGame: selectCurrentGame(state)
})

const Games = connect(mapStateToProp)(withSmartMapCtx<GamesProps>(GamesComponent));

export {Games};
