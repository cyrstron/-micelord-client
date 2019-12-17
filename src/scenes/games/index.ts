import { withSmartMapCtx } from 'react-google-maps-ts';

import {Games as GamesComponent, GamesProps} from './games';

export const Games = withSmartMapCtx<GamesProps>(GamesComponent);