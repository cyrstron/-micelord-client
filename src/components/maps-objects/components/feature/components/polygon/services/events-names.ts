import {featureEventNames} from '../../../services';

export const polygonEventNames: PolygonEventNames = {
	...featureEventNames,
	onMouseDown: 'mousedown',
	onMouseMove: 'mousemove',
	onMouseUp: 'mouseup'
};
