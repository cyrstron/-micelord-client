import {withDumbMapCtx} from '../../hocs/with-dumb-map-ctx';
import {withSmartMapCtx} from '../../hocs/with-smart-map-ctx';
import {Map} from './map';
import {MapProps} from './map.d';
import {MapStore} from './stores';

export const withMapCtx = withSmartMapCtx<MapStore>(MapStore);

export const DumbMap = withDumbMapCtx<MapStore, MapProps>(Map);
export const SmartMap = withMapCtx<MapProps>(Map);

export {MapStore} from './stores';
export {MapService} from './services';
export {Map};
