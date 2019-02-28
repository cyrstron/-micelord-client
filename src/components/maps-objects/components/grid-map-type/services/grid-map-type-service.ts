import {MapService} from '../../map';

export class GridMapTypeService {
  mapService: MapService;
  object: google.custom.GridMapType;

  constructor(
    google: Google,
    mapService: MapService,
    options: google.custom.GridMapTypeOptions,
  ) {
    const {GridMapType} = google.custom;

    const map = mapService.getObject();
    const object = new GridMapType({map, ...options});

    this.mapService = mapService;
    this.object = object;
  }

  remove() {
    this.object.setMap(null);
  }
}
