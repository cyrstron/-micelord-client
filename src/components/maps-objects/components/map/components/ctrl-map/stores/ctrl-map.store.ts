import { action, observable } from 'mobx';
import { MapStore } from '../../../stores';

export class CtrlMapStore extends MapStore {
  @observable bounds?: google.maps.LatLngBoundsLiteral;
  @observable center?: google.maps.LatLngLiteral;
  @observable zoom?: number;

  @action('Set bounds')
  setBounds(
    bounds: google.maps.LatLngBoundsLiteral |
      google.maps.LatLngLiteral[],
    ): void {
    const {service} = this;

    if (!service) return;

    service.setBounds(bounds);
  }

  @action('Pan to bounds')
  panToBounds(
    bounds: google.maps.LatLngBoundsLiteral |
      google.maps.LatLngLiteral[],
    ): void {
    const {service} = this;

    if (!service) return;

    service.panToBounds(bounds);
  }

  @action('Set center')
  setCenter(center: google.maps.LatLngLiteral): void {
    const {service} = this;

    if (!service) return;

    service.setCenter(center);
  }

  @action('Pan center')
  panTo(center: google.maps.LatLngLiteral): void {
    const {service} = this;

    if (!service) return;

    service.panTo(center);
  }

  @action('Set zoom')
  setZoom(zoom: number): void {
    const {service} = this;

    if (!service) return;

    service.setZoom(zoom);
  }

  @action('Update bounds')
  updateBounds(): void {
    const {service} = this;

    if (!service) return;

    const bounds = service.getBounds();

    this.bounds = bounds;
  }

  @action('Update center')
  updateCenter(): void {
    const {service} = this;

    if (!service) return;

    const center = service.getCenter();

    this.center = center;
  }

  @action('Update zoom')
  updateZoom(): void {
    const {service} = this;

    if (!service) return;

    const zoom = service.getZoom();

    this.zoom = zoom;
  }

  @action('Set ctrl map')
  setMap(container: HTMLDivElement, options: google.maps.MapOptions & {
    center: google.maps.LatLngLiteral,
    zoom: number,
  }) {
    super.setMap(container, options);

    const {service} = this;

    if (!service) return;

    const listener = service.addListener('idle', () => {
      this.updateBounds();
      this.updateCenter();
      this.updateZoom();

      listener.remove();
    });
  }
}
