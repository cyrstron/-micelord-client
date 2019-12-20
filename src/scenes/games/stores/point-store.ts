import { InputStore } from "@stores/input-store";
import { InputsStore } from "@stores/inputs-store";
import { computed } from "mobx";

interface GeoPointStoreProps {
  lat?: number;
  lng?: number;
}

export class GeoPointStore {
  lat: InputStore;
  lng: InputStore;

  inputs: InputsStore;

  validateLng = (value: string) => {
    const valueNumber = +value;

    if (isNaN(valueNumber)) throw new Error('Longitude is required field');

    if (valueNumber >= 180) throw new Error('Longitude should be less than 180 degrees');

    if (valueNumber < -180) throw new Error('Longitude shouldn\'t be less than -180 degrees');
  }

  validateLat = (value: string) => {
    const valueNumber = +value;
    
    if (isNaN(valueNumber)) throw new Error('Latitude is required field');

    if (valueNumber >= 180) throw new Error('Latitude shouldn\'t be more than 90 degrees');

    if (valueNumber < -180) throw new Error('Latitude shouldn\'t be less than -90 degrees');
  }

  @computed
  get values(): {
    lat: number;
    lng: number;
  } {
    return {
      lat: +this.lng.value,
      lng: +this.lat.value,
    };
  }

  constructor({
    lat,
    lng,
  }: GeoPointStoreProps) {
    this.lng = new InputStore({
      value: `${lng}`,
      validate: this.validateLng,
    });   
    this.lat = new InputStore({
      value: `${lat}`,
      validate: this.validateLat,
    });     

    this.inputs = new InputsStore([
      this.lat,
      this.lng,
    ]);
  }
}