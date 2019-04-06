import {MapService} from '@maps/map';

export class TilesOverlayService {
  mapService: MapService;
  object: google.custom.TilesOverlay;

  constructor(
    google: Google,
    mapService: MapService,
    options: google.custom.TilesOverlayOptions,
  ) {
    const {TilesOverlay} = google.custom;

    const map = mapService.getObject();
    const object = new TilesOverlay({map, ...options});

    this.mapService = mapService;
    this.object = object;
  }

  remove() {
    this.object.setMap(null);
  }
}
