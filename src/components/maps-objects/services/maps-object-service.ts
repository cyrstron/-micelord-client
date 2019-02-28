export class MapsObjectService<
  MapsObject extends google.maps.MapsObject<
    MapsObjectEventName,
    MapsObjectOptions,
    MapsObjectEventHandler
  >,
  MapsObjectEventName,
  MapsObjectOptions,
  MapsObjectEventHandler
> {
  google: Google;
  maps: google.Maps;
  object: MapsObject;

  constructor(
    google: Google,
    object: MapsObject,
  ) {
    this.google = google;
    this.maps = google.maps;
    this.object = object;
  }

  addListener(
    eventName: MapsObjectEventName,
    handler: MapsObjectEventHandler,
  ) {
    return this.object.addListener(eventName, handler);
  }

  setOptions(options: MapsObjectOptions) {
    if (!this.object.setOptions) return;

    this.object.setOptions(options);
  }

  getObject(): MapsObject {
    return this.object;
  }
}
