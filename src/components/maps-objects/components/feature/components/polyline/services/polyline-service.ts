import {MapService} from '../../../../map';
import { FeatureService } from '../../../services';

export class PolylineService extends FeatureService<
  google.maps.Polyline,
  PolylineEventName,
  google.maps.PolylineOptions,
  PolylineEventHandler> {

  constructor(
    google: Google,
    mapService: MapService,
    options: google.maps.PolylineOptions,
  ) {
    const map = mapService.getObject();
    const object = new google.maps.Polyline({map, ...options});

    super(google, object, mapService);
  }
}
