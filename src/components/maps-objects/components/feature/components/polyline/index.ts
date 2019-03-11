import {withDumbFeatureCtx} from '../../hocs/with-dumb-feature-ctx';
import {withFullFeatureCtx} from '../../hocs/with-full-feature-ctx';
import {withSmartFeatureCtx} from '../../hocs/with-smart-feature-ctx';
import {Polyline} from './polyline';
import {PolylineService} from './services';
import {PolylineStore} from './stores';

export const SmartPolyline = withFullFeatureCtx<
  PolylineEventName,
  google.maps.PolylineOptions,
  PolylineEventHandler,
  PolylineHandlerName,
  google.maps.Polyline,
  PolylineService,
  PolylineStore
>(PolylineStore)<PolylineProps>(Polyline);
export const DumbPolyline = withDumbFeatureCtx<
  PolylineEventName,
  google.maps.PolylineOptions,
  PolylineEventHandler,
  PolylineHandlerName,
  google.maps.Polyline,
  PolylineService,
  PolylineStore,
  PolylineProps
>(Polyline);
export const withSmartPolylineCtx = withSmartFeatureCtx<
  PolylineEventName,
  google.maps.PolylineOptions,
  PolylineEventHandler,
  PolylineHandlerName,
  google.maps.Polyline,
  PolylineService,
  PolylineStore
>(PolylineStore);

export {
  PolylineStore,
  Polyline,
};
