import { MapsObjectService } from '../../../services';

export class MapService extends MapsObjectService<
  google.maps.Map,
  MapEventName,
  google.maps.MapOptions,
  MapEventHandler
> {
  constructor(
    google: Google,
    container: HTMLDivElement,
    options: google.maps.MapOptions,
  ) {
    const object: google.maps.Map = new google.maps.Map(container, options);

    super(google, object);
  }

  setCenter(center: google.maps.LatLngLiteral) {
    this.object.setCenter(center);
  }

  panTo(center: google.maps.LatLngLiteral) {
    this.object.panTo(center);
  }

  setZoom(zoom: number) {
    this.object.setZoom(zoom);
  }

  setBounds(
    bounds: google.maps.LatLngBounds |
      google.maps.LatLngBoundsLiteral |
      google.maps.LatLngLiteral[],
  ) {
    bounds = this.convertToLatLngBounds(bounds);

    this.object.fitBounds(bounds);
  }

  panToBounds(
    bounds: google.maps.LatLngBounds |
      google.maps.LatLngBoundsLiteral |
      google.maps.LatLngLiteral[],
  ) {
    bounds = this.convertToLatLngBounds(bounds);

    this.object.panToBounds(bounds);
  }

  getBounds(): google.maps.LatLngBoundsLiteral | undefined {
    const bounds = this.object.getBounds();

    if (!bounds) return;

    return this.google.custom.boundsToLiteral(bounds);
  }

  getZoom(): number {
    return this.object.getZoom();
  }

  getCenter(): google.maps.LatLngLiteral {
    const center = this.object.getCenter();

    return {
      lat: center.lat(),
      lng: center.lng(),
    };
  }

  setOptions({bounds, ...options}: google.maps.MapOptions & {
    bounds?: google.maps.LatLngBoundsLiteral | google.maps.LatLngLiteral[],
  }) {
    if (bounds) {
      this.setBounds(bounds);
    }

    super.setOptions(options);
  }

  insertMapType(index: number, overlay: google.maps.MapType) {
    this.object.overlayMapTypes.insertAt(index, overlay);
  }

  private convertToLatLngBounds(
    bounds: google.maps.LatLngBounds |
      google.maps.LatLngBoundsLiteral |
      google.maps.LatLngLiteral[],
  ): google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral {
    if (Array.isArray(bounds)) {
      bounds = this.google.custom.pointsToBounds(bounds);
    }

    return bounds;
  }
}
