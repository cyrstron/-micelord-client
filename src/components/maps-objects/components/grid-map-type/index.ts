import {GridMapType} from './grid-map-type';
import {GridMapTypeProps} from './types';
import {withDumbMapTypeCtx} from './hocs';
import {withFullMapTypeCtx} from './hocs';
import {withSmartMapTypeCtx} from './hocs';
import {GridMapTypeStore} from './stores';

export const SmartGridMapType = withFullMapTypeCtx<
  GridMapTypeStore
>(GridMapTypeStore)<GridMapTypeProps>(GridMapType);
export const DumbGridMapType = withDumbMapTypeCtx<
  GridMapTypeStore,
  GridMapTypeProps
>(GridMapType);
export const withSmartGridMapTypeCtx = withSmartMapTypeCtx<
  GridMapTypeStore
>(GridMapTypeStore);

export {
  GridMapTypeStore,
  GridMapType,
};
