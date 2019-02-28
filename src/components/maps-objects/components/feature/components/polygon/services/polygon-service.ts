import {MapService} from '../../../../map';
import { FeatureService } from '../../../services';
import {
  PolygonEventHandler,
  PolygonEventName,
} from '../polygon.d';

export class PolygonService extends FeatureService<
  google.maps.Polygon,
  PolygonEventName,
  google.maps.PolygonOptions,
  PolygonEventHandler> {

  constructor(
    google: Google,
    mapService: MapService,
    options: google.maps.PolygonOptions,
  ) {
    const map = mapService.getObject();
    const object = new google.maps.Polygon({map, ...options});

    super(google, object, mapService);
  }
}
