import {featureEventNames} from '../../../services';

export const polylineEventNames: PolylineEventNames = {
	...featureEventNames,
	onMouseDown: 'mousedown',
	onMouseMove: 'mousemove',
	onMouseUp: 'mouseup'
};
