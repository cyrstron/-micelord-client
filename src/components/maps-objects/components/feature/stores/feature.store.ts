import {MapsObjectStore} from '../../../stores';
import {MapService} from '../../map';
import {FeatureService} from '../services';

export abstract class FeatureStore<
  Feature extends google.maps.Feature<
    EventName,
    Options,
    EventHandler
  >,
  Options,
  EventName,
  HandlerName,
  EventHandler,
  Service extends FeatureService<
    Feature,
    EventName,
    Options,
    EventHandler
  >
> extends MapsObjectStore<
  Feature,
  Options,
  EventName,
  HandlerName & string,
  EventHandler,
  Service
> {
  mapService: MapService;

  constructor(google: Google, mapService: MapService) {
    super(google);

    this.mapService = mapService;
  }

  remove() {
    if (!this.service) return;

    this.service.remove();
  }
}
