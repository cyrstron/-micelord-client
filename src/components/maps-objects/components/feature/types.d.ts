type FeatureEventsProps =  MapsObjectEventProps & {
	onMouseDown?: google.maps.MouseEvent,
	onMouseMove?: google.maps.MouseEvent,
	onMouseUp?: google.maps.MouseEvent,    
}
  
type FeatureEventName = MapsObjectEventName | 
	'mousedown' |
	'mousemove'	|
	'mouseup';
	
type FeatureHandlerName = MapsObjectHandlerName |
	'onMouseDown' |
	'onMouseMove' | 
	'onMouseUp';

type FeatureEventNames = {
	[key in FeatureHandlerName]: FeatureEventName;
}