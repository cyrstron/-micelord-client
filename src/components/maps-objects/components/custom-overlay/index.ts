import {CustomOverlay, CustomOverlayProps} from './custom-overlay';
import {withDumbOverlayCtx} from './hocs';
import {withFullOverlayCtx} from './hocs';
import {withSmartOverlayCtx} from './hocs/';
import {CustomOverlayStore} from './stores';

export const SmartCustomOverlay = withFullOverlayCtx<
  CustomOverlayStore
>(CustomOverlayStore)<CustomOverlayProps>(CustomOverlay);

export const DumbCustomOverlay = withDumbOverlayCtx<
  CustomOverlayStore,
  CustomOverlayProps
>(CustomOverlay);

export const withSmartCustomOverlayCtx = withSmartOverlayCtx<
  CustomOverlayStore
>(CustomOverlayStore);

export {
  CustomOverlayStore,
  CustomOverlay,
};
