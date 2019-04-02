type PolylineEventsProps = FeatureEventsProps & {
	onMouseDown?: google.maps.MapPolyEventHandler,
	onMouseMove?: google.maps.MapPolyEventHandler,
	onMouseUp?: google.maps.MapPolyEventHandler,    
	onClick?: google.maps.MapPolyEventHandler,
	onDblClick?: google.maps.MapPolyEventHandler,
	onMouseOut?: google.maps.MapPolyEventHandler,
	onMouseOver?: google.maps.MapPolyEventHandler,
	onRightClick?: google.maps.MapPolyEventHandler,
}
  
type PolylineEventHandler = google.maps.MapMouseEventHandler |
	google.maps.MapPolyEventHandler;

type PolylineProps = google.maps.PolylineOptions & 
	PolylineEventsProps & {
		path: geo.Location[]
	};
  
type PolylineEventName = FeatureEventName |  
	'mousedown' |
	'mousemove'	|
	'mouseup';
	
type PolylineHandlerName = FeatureHandlerName |
	'onMouseDown' |
	'onMouseMove' | 
	'onMouseUp';

type PolylineEventNames = {
	[key in PolylineHandlerName]: PolylineEventName;
};