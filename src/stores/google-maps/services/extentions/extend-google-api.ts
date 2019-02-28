import { createBoundsUtils } from './bounds-utils';
import { createCustomOverlayClass } from './custom-overlay';
import { createGridMapTypeClass } from './grid-map-type';

export const extendGoogleApi = (google: Google) => {
  const CustomOverlay = createCustomOverlayClass(google);
  const GridMapType = createGridMapTypeClass(google);
  const boundsUtils = createBoundsUtils(google);

  google.custom = {
    CustomOverlay,
    GridMapType,
    ...boundsUtils,
  };
};
