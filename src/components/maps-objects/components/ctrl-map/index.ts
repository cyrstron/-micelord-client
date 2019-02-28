import {withDumbMapCtx} from '../../hocs/with-dumb-map-ctx';
import {withSmartMapCtx} from '../../hocs/with-smart-map-ctx';
import {MapProps} from '../map/map.d';
import {CtrlMap} from './ctrl-map';
import {CtrlMapStore} from './stores';

export const withCtrlMapCtx = withSmartMapCtx<CtrlMapStore>(CtrlMapStore);

export const DumbCtrlMap = withDumbMapCtx<CtrlMapStore, MapProps>(CtrlMap);
export const SmartCtrlMap = withCtrlMapCtx<MapProps>(CtrlMap);

export {CtrlMap};
export {CtrlMapStore};
