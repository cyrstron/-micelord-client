import {
	FeatureEventName,
	FeatureHandlerName,
	featureEventNames,
	FeatureEventsProps
} from '../../feature.d';

export interface PolygonEventsProps extends FeatureEventsProps {
	onMouseDown?: google.maps.MapPolyEventHandler,
	onMouseMove?: google.maps.MapPolyEventHandler,
	onMouseUp?: google.maps.MapPolyEventHandler,    
	onClick?: google.maps.MapPolyEventHandler,
	onDblClick?: google.maps.MapPolyEventHandler,
	onMouseOut?: google.maps.MapPolyEventHandler,
	onMouseOver?: google.maps.MapPolyEventHandler,
	onRightClick?: google.maps.MapPolyEventHandler,
}
  
export type PolygonEventHandler = google.maps.MapMouseEventHandler |
	google.maps.MapPolyEventHandler;

export type PolygonProps = google.maps.PolygonOptions & 
	PolygonEventsProps & {
		paths: geo.Location[]
	};
  
export type PolygonEventName = FeatureEventName &    
	'mousedown' |
	'mousemove'	|
	'mouseup';
	
export type PolygonHandlerName = FeatureHandlerName &
	'onMouseDown' |
	'onMouseMove' | 
	'onMouseUp';

export const polygonEventNames: {
	[key in PolygonHandlerName]: PolygonEventName;
} = {
	...featureEventNames,
	onMouseDown: 'mousedown',
	onMouseMove: 'mousemove',
	onMouseUp: 'mouseup'
};
  	