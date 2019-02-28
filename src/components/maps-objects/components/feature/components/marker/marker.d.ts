import {
	FeatureEventName,
	FeatureHandlerName,
	featureEventNames,
	FeatureEventsProps
} from '../../feature.d';

export type MarkerEventHandler = google.maps.MapEventHandler | 
  google.maps.MouseEvent;

export interface MarkerEventsProps extends FeatureEventsProps {
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

export type MarkerProps = google.maps.MarkerOptions & 
  MarkerEventsProps & {
    position: geo.Location;
    title: string;
  };

export type MarkerEventName = FeatureEventName &
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
  
export type MarkerHandlerName = FeatureHandlerName &
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

export const markerEventNames: {
  [key in MarkerHandlerName]: MarkerEventName;
} = {
  ...featureEventNames,
  onAnimationChanged: 'animation_changed',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDraggableChanged: 'draggable_changed',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
  onPositionChanged: 'position_changed',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZIndexChanged: 'zindex_changed',
};
