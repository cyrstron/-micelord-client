import {action} from 'mobx';
import {FeatureStore} from '../../../stores';
import {groupPolygonProps, PolygonService} from '../services';
import {polygonEventNames} from '../services';

export class PolygonStore extends FeatureStore<
  google.maps.Polygon,
  google.maps.PolygonOptions,
  PolygonEventName,
  PolygonHandlerName,
  PolygonEventHandler,
  PolygonService
> {
  eventNames = polygonEventNames;
  groupProps = groupPolygonProps;

  @action
  setPolygon(props: PolygonProps) {
    const {
      options,
      handlers,
    } = this.groupProps(props);

    if (!options) return;

    const service = new PolygonService(
      this.google,
      this.mapService,
      options,
    );

    this.setService(service, handlers);
  }
}
