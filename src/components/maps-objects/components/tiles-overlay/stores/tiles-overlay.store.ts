import {action, observable} from 'mobx';
import {MapService} from '../../map';
import {TilesOverlayService} from '../services';

export class TilesOverlayStore {
  @observable isLoaded = false;
  @observable tiles = new Map<Node, {
    tileCoord: google.maps.Point,
    zoom: number,
  }>();
  service?: TilesOverlayService;
  maps: google.Maps;

  constructor(
    public google: Google,
    public mapService: MapService,
  ) {
    this.maps = google.maps;
  }

  @action
  setOverlay(options: google.custom.TilesOverlayOptions) {
    if (!options) return;

    this.service = new TilesOverlayService(this.google, this.mapService, options);
    this.isLoaded = true;
  }

  @action
  registerTile(node: Node, payload: {
    tileCoord: google.maps.Point,
    zoom: number,
  }) {
    this.tiles.set(node, payload);
  }

  @action
  unregisterTile(node: Node) {
    this.tiles.delete(node);
  }

  remove(): void {
    const {service} = this;

    if (!service) return;

    service.remove();
  }
}
