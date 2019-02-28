import {action, observable} from 'mobx';
import {MapService} from '../../map';
import {GridMapTypeService} from '../services';

export class GridMapTypeStore {
  @observable isLoaded = false;
  service?: GridMapTypeService;
  maps: google.Maps;

  constructor(
    public google: Google,
    public mapService: MapService,
  ) {
    this.maps = google.maps;
  }

  @action
  setGridMapType(options: google.custom.GridMapTypeOptions) {
    if (!options) return;

    this.service = new GridMapTypeService(this.google, this.mapService, options);
    this.isLoaded = true;
  }

  remove(): void {
    const {service} = this;

    if (!service) return;

    service.remove();
  }
}
