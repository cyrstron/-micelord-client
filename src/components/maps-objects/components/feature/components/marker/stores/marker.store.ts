import {action} from 'mobx';
import {MapService} from '../../../../map';
import {FeatureStore} from '../../../stores';
import {
  MarkerEventHandler,
  MarkerEventName,
  markerEventNames,
  MarkerHandlerName,
  MarkerProps,
} from '../marker.d';
import {groupMarkerProps, MarkerService} from '../services';

export class MarkerStore extends FeatureStore<
  google.maps.Marker,
  google.maps.MarkerOptions,
  MarkerEventName,
  MarkerHandlerName,
  MarkerEventHandler,
  MarkerService
> {
  eventNames = markerEventNames;
  groupProps = groupMarkerProps;

  @action
  setMarker(props: MarkerProps) {
    const {
      options,
      handlers,
    } = this.groupProps(props);

    if (!options) return;

    const service = new MarkerService(
      this.google,
      this.mapService,
      options,
    );

    this.setService(service, handlers);
  }
}
