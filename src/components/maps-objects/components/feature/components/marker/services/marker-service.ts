import {MapService} from '../../../../map';
import {FeatureService} from '../../../services';

export class MarkerService extends FeatureService<
  google.maps.Marker,
  MarkerEventName,
  google.maps.MarkerOptions,
  MarkerEventHandler
> {
  constructor(
    google: Google,
    mapService: MapService,
    options: google.maps.MarkerOptions,
  ) {
    const map = mapService.getObject();
    const object = new google.maps.Marker({map, ...options});

    super(google, object, mapService);
  }
}
