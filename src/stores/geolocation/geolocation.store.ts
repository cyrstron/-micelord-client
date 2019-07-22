import {action, computed, observable} from 'mobx';
import { GeolocationActions } from './geolocation.actions';
import {GeoPoint} from '@micelord/grider';

export interface GeolocationProps {
  geolocationStore?: GeolocationStore;
}

export class GeolocationStore {

  @computed
  get position(): GeoPoint | undefined {
    if (this.lat === undefined || this.lng === undefined) return;

    return new GeoPoint(this.lat, this.lng);
  }

  @observable error?: PositionError;
  @observable lat?: number;
  @observable lng?: number;
  @observable watchId?: number;

  private actions: GeolocationActions;

  constructor() {
    this.actions = new GeolocationActions();
  }

  @action('Watch position')
  watchPosition(): void {
    if (this.watchId !== undefined) return;

    this.watchId = this.actions.watchPosition(
      this.positionWatcher,
      this.errorHandler, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 3000,
      });
  }

  @action('Unwatch position')
  unwatchPosition(): void {
    if (this.watchId === undefined) return;

    this.actions.unwatchPosition(this.watchId);
    this.watchId = undefined;
  }

  @action('Change position')
  private positionWatcher = ({
    coords: {latitude, longitude},
  }: Position): void => {
    if (this.lat === latitude && this.lng === longitude) return;

    this.lat = latitude;
    this.lng = longitude;
  }

  @action('Position error')
  private errorHandler = (error: PositionError): void => {
    this.unwatchPosition();

    switch (error.code) {
      case 3:
        this.watchPosition();
        break;
      default:
      this.error = error;
    }
    console.error(error);
  }
}
