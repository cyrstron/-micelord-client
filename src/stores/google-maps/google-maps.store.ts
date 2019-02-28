import {action, observable} from 'mobx';
import {GoogleMapsActions} from './services';

declare global {
  interface Window {
    google: Google;
  }
}

export class GoogleMapsStore {
  @observable isPending: boolean = true;
  @observable isLoaded: boolean = false;
  @observable isFailed: boolean = false;
  @observable err?: Error;

  google?: Google;
  maps?: google.Maps;
  custom?: google.Custom;

  private actions: GoogleMapsActions;

  constructor(apiKey: string) {
    this.actions = new GoogleMapsActions(apiKey);
  }

  @action
  async init() {
    if (this.isLoaded) return Promise.resolve();

    try {
      await this.actions.loadApi();
      const {google} = window;

      this.actions.extendApi(google);
      this.isLoaded = true;
      this.isPending = false;

      this.google = google;
      this.maps = google.maps;
      this.custom = google.custom;
    } catch (err) {
      console.error(err);

      this.err = err;
      this.isPending = false;
      this.isFailed = true;
    }
  }
}
