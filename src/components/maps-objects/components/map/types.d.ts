type MapEventHandler = google.maps.MapMouseEventHandler | 
  google.maps.MapEventHandler | 
  google.maps.MapIconEventHandler;
  
type MapEventsProps = MapsObjectEventProps & {
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

type MapProps = MapEventsProps & google.maps.MapOptions & {
  className?: string;
  bounds?: google.maps.LatLngBoundsLiteral;
  defaultCenter: google.maps.LatLngLiteral;
  zoom: number;
} ;

type MapMouseHandlerName = MapsObjectHandlerName |
  'onMouseMove';

type MapOtherHandlerName = 'onBoundsChanged' |
  'onCenterChanged' |
  'onHeadingChanged' |
  'onIdle' |
  'onMaptypeIdChanged' |
  'onProjectionChanged' |
  'onTilesLoaded' |
  'onTiltChanged' |
  'onZoomChanged';

type MapHandlerName = MapMouseHandlerName | MapOtherHandlerName;

type MapEventName = MapsObjectEventName | 
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

type MapComponentHandler = (e?: google.maps.MouseEvent) => void;

type MapEventNames = {
  [key in MapHandlerName]: MapEventName
};