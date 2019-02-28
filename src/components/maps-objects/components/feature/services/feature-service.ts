import {MapsObjectService} from '../../../services';
import {MapService} from '../../map';

export class FeatureService<
  Feature extends google.maps.Feature<
    EventName,
    Options,
    EventHandler
  >,
  EventName,
  Options,
  EventHandler
> extends MapsObjectService<
  Feature,
  EventName,
  Options,
  EventHandler
> {
  mapService: MapService;

  constructor(
    google: Google,
    object: Feature,
    mapService: MapService,
  ) {
    super(google, object);

    this.mapService = mapService;
  }

  remove() {
    this.object.setMap(null);
  }
}
