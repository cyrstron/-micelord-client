import {
  MapsObjectEventName,
  MapsObjectHandlerName,
  mapsObjectEventNames,
  MapsObjectEventProps
} from '../../maps-object.d';

import { ReactNode } from 'react';

export type MapEventHandler = google.maps.MapMouseEventHandler | 
  google.maps.MapEventHandler | 
  google.maps.MapIconEventHandler;
  
export interface MapEventsProps extends MapsObjectEventProps {
  onMouseMove?: google.maps.MapMouseEventHandler;
  onBoundsChanged?: google.maps.MapEventHandler;
  onCenterChanged?: google.maps.MapEventHandler;
  onHeadingChanged?: google.maps.MapEventHandler;
  onIdle?: google.maps.MapEventHandler;
  onMaptypeIdChanged?: google.maps.MapEventHandler;
  onProjectionChanged?: google.maps.MapEventHandler;
  onTilesLoaded?: google.maps.MapEventHandler;
  onTiltChanged?: google.maps.MapEventHandler;
  onZoomChanged?: google.maps.MapEventHandler;
  onClick?: google.maps.MapMouseEventHandler | google.maps.MapIconEventHandler;
}

export interface Props {
  children?: ReactNode | null;
  className?: string;
  bounds?: google.maps.LatLngBoundsLiteral;
  defaultCenter: google.maps.LatLngLiteral;
  zoom: number;
} 

export type MapProps = Props & MapEventsProps & google.maps.MapOptions;

export type MapMouseHandlerName = MapsObjectHandlerName &
  'onMouseMove';

export type MapOtherHandlerName = 'onBoundsChanged' |
  'onCenterChanged' |
  'onHeadingChanged' |
  'onIdle' |
  'onMaptypeIdChanged' |
  'onProjectionChanged' |
  'onTilesLoaded' |
  'onTiltChanged' |
  'onZoomChanged';

export type MapHandlerName = MapMouseHandlerName | MapOtherHandlerName;

export type MapEventName = MapsObjectEventName & 
  'bounds_changed' |
  'center_changed' |
  'heading_changed' |
  'idle' |
  'maptypeid_changed' |
  'mousemove' |
  'projection_changed' |
  'tilesloaded' |
  'tilt_changed' |
  'zoom_changed';

export const mapEventNames: {
  [key in MapHandlerName]: MapEventName
} = {
  ...mapsObjectEventNames,
  onMouseMove: 'mousemove',
  onBoundsChanged: 'bounds_changed',
  onCenterChanged: 'center_changed',
  onHeadingChanged: 'heading_changed',
  onIdle: 'idle',
  onMaptypeIdChanged: 'maptypeid_changed',
  onProjectionChanged: 'projection_changed',
  onTilesLoaded: 'tilesloaded',
  onTiltChanged: 'tilt_changed',
  onZoomChanged: 'zoom_changed',
}

export type MapComponentHandler = (e?: google.maps.MouseEvent) => void;