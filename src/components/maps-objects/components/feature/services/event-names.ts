import {mapsObjectEventNames} from '../../../services';

export const featureEventNames: FeatureEventNames = {
	...mapsObjectEventNames,
	onMouseDown: 'mousedown',
	onMouseMove: 'mousemove',
	onMouseUp: 'mouseup'
};
  	