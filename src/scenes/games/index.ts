import { withSmartMapCtx } from 'react-google-maps-ts';

import {Games as GamesComponent, GamesProps} from './games';

const Games = withSmartMapCtx<GamesProps>(GamesComponent);

export {Games};
