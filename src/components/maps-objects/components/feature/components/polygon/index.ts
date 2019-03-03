import {withDumbFeatureCtx} from '../../hocs/with-dumb-feature-ctx';
import {withFullFeatureCtx} from '../../hocs/with-full-feature-ctx';
import {withSmartFeatureCtx} from '../../hocs/with-smart-feature-ctx';
import {Polygon} from './polygon';
import {PolygonService} from './services';
import {PolygonStore} from './stores';

export const SmartPolygon = withFullFeatureCtx<
  PolygonEventName,
  google.maps.PolygonOptions,
  PolygonEventHandler,
  PolygonHandlerName,
  google.maps.Polygon,
  PolygonService,
  PolygonStore
>(PolygonStore)<PolygonProps>(Polygon);
export const DumbPolygon = withDumbFeatureCtx<
  PolygonEventName,
  google.maps.PolygonOptions,
  PolygonEventHandler,
  PolygonHandlerName,
  google.maps.Polygon,
  PolygonService,
  PolygonStore,
  PolygonProps
>(Polygon);
export const withSmartPolygonCtx = withSmartFeatureCtx<
  PolygonEventName,
  google.maps.PolygonOptions,
  PolygonEventHandler,
  PolygonHandlerName,
  google.maps.Polygon,
  PolygonService,
  PolygonStore
>(PolygonStore);

export {
  PolygonStore,
  Polygon,
};
