import {action, observable} from 'mobx';
import {MapService} from '../../map';
import {CustomOverlayService} from '../services';

export class CustomOverlayStore {
  @observable isLoaded = false;
  service?: CustomOverlayService;
  maps: google.Maps;

  constructor(
    public google: Google,
    public mapService: MapService,
  ) {
    this.maps = google.maps;
  }

  @action
  setCustomOverlay(options: google.custom.CustomOverlayOptions) {
    if (!options) return;

    this.service = new CustomOverlayService(this.google, this.mapService, options);
    this.isLoaded = true;
  }

  getContainer(): HTMLDivElement | void {
    return this.service && this.service.getContainer();
  }

  remove(): void {
    const {service} = this;

    if (!service) return;

    service.remove();
  }
}
