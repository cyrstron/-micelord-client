
import {withDumbFeatureCtx} from '../../hocs/with-dumb-feature-ctx';
import {withFullFeatureCtx} from '../../hocs/with-full-feature-ctx';
import {withSmartFeatureCtx} from '../../hocs/with-smart-feature-ctx';
import {Marker} from './marker';
import {MarkerService} from './services';
import {MarkerStore} from './stores';

export const SmartMarker = withFullFeatureCtx<
  MarkerEventName,
  google.maps.MarkerOptions,
  MarkerEventHandler,
  MarkerHandlerName,
  google.maps.Marker,
  MarkerService,
  MarkerStore
>(MarkerStore)<MarkerProps>(Marker);
export const DumbMarker = withDumbFeatureCtx<
  MarkerEventName,
  google.maps.MarkerOptions,
  MarkerEventHandler,
  MarkerHandlerName,
  google.maps.Marker,
  MarkerService,
  MarkerStore,
  MarkerProps
>(Marker);
export const withSmartMarkerCtx = withSmartFeatureCtx<
  MarkerEventName,
  google.maps.MarkerOptions,
  MarkerEventHandler,
  MarkerHandlerName,
  google.maps.Marker,
  MarkerService,
  MarkerStore
>(MarkerStore);

export {
    MarkerStore,
    Marker,
};
