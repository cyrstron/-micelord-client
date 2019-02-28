import {MapService} from '../../map';

export class CustomOverlayService {
  mapService: MapService;
  object: google.custom.CustomOverlay;

  constructor(
    google: Google,
    mapService: MapService,
    options: google.custom.CustomOverlayOptions,
  ) {
    const {CustomOverlay} = google.custom;

    const map = mapService.getObject();
    const object = new CustomOverlay({map, ...options});

    this.mapService = mapService;
    this.object = object;
  }

  getContainer(): HTMLDivElement | void {
    return this.object.getContainer();
  }

  remove() {
    this.object.setMap(null);
  }
}
