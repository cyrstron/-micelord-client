type PolygonEventsProps = FeatureEventsProps & {
	onMouseDown?: google.maps.MapPolyEventHandler,
	onMouseMove?: google.maps.MapPolyEventHandler,
	onMouseUp?: google.maps.MapPolyEventHandler,    
	onClick?: google.maps.MapPolyEventHandler,
	onDblClick?: google.maps.MapPolyEventHandler,
	onMouseOut?: google.maps.MapPolyEventHandler,
	onMouseOver?: google.maps.MapPolyEventHandler,
	onRightClick?: google.maps.MapPolyEventHandler,
}
  
type PolygonEventHandler = google.maps.MapMouseEventHandler |
	google.maps.MapPolyEventHandler;

type PolygonProps = google.maps.PolygonOptions & 
	PolygonEventsProps & {
		paths: geo.Location[] | geo.Location[][]
	};
  
type PolygonEventName = FeatureEventName |  
	'mousedown' |
	'mousemove'	|
	'mouseup';
	
type PolygonHandlerName = FeatureHandlerName |
	'onMouseDown' |
	'onMouseMove' | 
	'onMouseUp';

type PolygonEventNames = {
	[key in PolygonHandlerName]: PolygonEventName;
};