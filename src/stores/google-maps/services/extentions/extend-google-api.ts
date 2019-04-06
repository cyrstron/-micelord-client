import { createBoundsUtils } from './bounds-utils';
import { createCustomOverlayClass } from './custom-overlay';
import { createTilesOverlayClass } from './tiles-overlay';

export const extendGoogleApi = (google: Google) => {
  const CustomOverlay = createCustomOverlayClass(google);
  const TilesOverlay = createTilesOverlayClass(google);
  const boundsUtils = createBoundsUtils(google);

  google.custom = {
    CustomOverlay,
    TilesOverlay,
    ...boundsUtils,
  };
};
