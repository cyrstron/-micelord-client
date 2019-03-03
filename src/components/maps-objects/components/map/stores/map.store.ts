import {action} from 'mobx';
import {groupMapProps, MapService, mapEventNames} from '../services';
import {MapsObjectStore} from './../../../stores';

declare global {
  interface Window {
    google: Google;
  }
}

type MapOptionsExtended = google.maps.MapOptions & {
  bounds?: google.maps.LatLngLiteral[] | google.maps.LatLngBoundsLiteral,
};

export class MapStore extends MapsObjectStore<
  google.maps.Map,
  MapOptionsExtended,
  MapEventName,
  MapHandlerName,
  MapEventHandler,
  MapService
> {
  eventNames = mapEventNames;
  groupProps = groupMapProps;

  @action('Set map')
  setMap(
    container: HTMLDivElement,
    props: MapEventsProps & google.maps.MapOptions & {
      center: google.maps.LatLngLiteral,
      zoom: number,
    },
  ) {
    const {handlers, options} = this.groupProps(props);

    const service = new MapService(this.google, container, options as {
      center: geo.Location,
      zoom: number,
    });

    this.setService(service, handlers);
  }

  getBounds(): google.maps.LatLngBoundsLiteral | undefined {
    return this.service && this.service.getBounds();
  }

  insertMapType(index: number, overlay: google.maps.MapType) {
    if (!this.service) return;

    this.service.insertMapType(index, overlay);
  }
}
