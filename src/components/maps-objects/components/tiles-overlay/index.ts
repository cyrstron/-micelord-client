import {TilesOverlay} from './tiles-overlay';
import {TilesOverlayProps} from './types';
import {withDumbTilesOverlayCtx} from './hocs';
import {withFullTilesOverlayCtx} from './hocs';
import {withSmartTilesOverlayCtx} from './hocs';
import {TilesOverlayStore} from './stores';

export const SmartTilesOverlay = withFullTilesOverlayCtx<
  TilesOverlayStore
>(TilesOverlayStore)<TilesOverlayProps>(TilesOverlay);
export const DumbGridMapType = withDumbTilesOverlayCtx<
  TilesOverlayStore,
  TilesOverlayProps
>(TilesOverlay);
export const withSmartGridMapTypeCtx = withSmartTilesOverlayCtx<
  TilesOverlayStore
>(TilesOverlayStore);

export {
  TilesOverlayStore,
  TilesOverlay,
};
