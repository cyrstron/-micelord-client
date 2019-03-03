type MarkerEventHandler = google.maps.MapEventHandler | 
  google.maps.MouseEvent;

type MarkerEventsProps = FeatureEventsProps & {
  onAnimationChanged?: google.maps.MapEventHandler;
  onClickableChanged?: google.maps.MapEventHandler;
  onCursorChanged?: google.maps.MapEventHandler;
  onDraggableChanged?: google.maps.MapEventHandler;
  onFlatChanged?: google.maps.MapEventHandler;
  onIconChanged?: google.maps.MapEventHandler;
  onMouseDown?: google.maps.MapEventHandler;
  onMouseUp?: google.maps.MapEventHandler;
  onPositionChanged?: google.maps.MapEventHandler;
  onShapeChanged?: google.maps.MapEventHandler;
  onTitleChanged?: google.maps.MapEventHandler;
  onVisibleChanged?: google.maps.MapEventHandler;
  onZIndexChanged?: google.maps.MapEventHandler;
}

type MarkerProps = google.maps.MarkerOptions & 
  MarkerEventsProps & {
    position: geo.Location;
    title: string;
  };

type MarkerEventName = FeatureEventName |
  'animation_changed' | 
  'clickable_changed' | 
  'cursor_changed' | 
  'draggable_changed' | 
  'flat_changed' | 
  'icon_changed' | 
  'mousedown' | 
  'mouseup' | 
  'position_changed' | 
  'shape_changed' | 
  'title_changed' | 
  'visible_changed' | 
  'zindex_changed';
  
type MarkerHandlerName = FeatureHandlerName |
  'onAnimationChanged' | 
  'onClickableChanged' | 
  'onCursorChanged' | 
  'onDraggableChanged' | 
  'onFlatChanged' | 
  'onIconChanged' | 
  'onMouseDown' | 
  'onMouseUp' | 
  'onPositionChanged' | 
  'onShapeChanged' | 
  'onTitleChanged' | 
  'onVisibleChanged' | 
  'onZIndexChanged';

type MarkerEventNames = {
  [key in MarkerHandlerName]: MarkerEventName;
}
