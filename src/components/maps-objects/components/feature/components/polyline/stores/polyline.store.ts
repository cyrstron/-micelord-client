import {action} from 'mobx';
import {FeatureStore} from '../../../stores';
import {groupPolylineProps, PolylineService} from '../services';
import {polylineEventNames} from '../services';

export class PolylineStore extends FeatureStore<
  google.maps.Polyline,
  google.maps.PolylineOptions,
  PolylineEventName,
  PolylineHandlerName,
  PolylineEventHandler,
  PolylineService
> {
  eventNames = polylineEventNames;
  groupProps = groupPolylineProps;

  @action
  setPolyline(props: PolylineProps) {
    const {
      options,
      handlers,
    } = this.groupProps(props);

    if (!options) return;

    const service = new PolylineService(
      this.google,
      this.mapService,
      options,
    );

    this.setService(service, handlers);
  }
}
