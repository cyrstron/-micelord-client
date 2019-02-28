import {
	MapsObjectEventName,
	MapsObjectHandlerName,
	mapsObjectEventNames,
	MapsObjectEventProps
} from '../../maps-object.d';

export interface FeatureEventsProps extends MapsObjectEventProps {
	onMouseDown?: google.maps.MouseEvent,
	onMouseMove?: google.maps.MouseEvent,
	onMouseUp?: google.maps.MouseEvent,    
}
  
export type FeatureEventName = MapsObjectEventName &    
	'mousedown' |
	'mousemove'	|
	'mouseup';
	
export type FeatureHandlerName = MapsObjectHandlerName &
	'onMouseDown' |
	'onMouseMove' | 
	'onMouseUp';

export const featureEventNames: {
	[key in FeatureEventName]: google.maps.MapEventHandler;
} = {
	...mapsObjectEventNames,
	onMouseDown: 'mousedown',
	onMouseMove: 'mousemove',
	onMouseUp: 'mouseup'
};
  	