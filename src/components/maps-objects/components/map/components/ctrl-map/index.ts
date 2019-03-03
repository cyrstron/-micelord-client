import {withDumbMapCtx} from '../../../../hocs';
import {withSmartMapCtx} from '../../../../hocs';
import {CtrlMap, CtrlMapProps} from './ctrl-map';
import {CtrlMapStore} from './stores';

export const withCtrlMapCtx = withSmartMapCtx<CtrlMapStore>(CtrlMapStore);

export const DumbCtrlMap = withDumbMapCtx<CtrlMapStore, CtrlMapProps>(CtrlMap);
export const SmartCtrlMap = withCtrlMapCtx<MapProps>(CtrlMap);

export {CtrlMap};
export {CtrlMapStore};
