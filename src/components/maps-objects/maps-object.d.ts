export type MapsObjectHandlerName = 'onClick' |
  'onDblClick' |
  'onDrag' |
  'onDragStart' |
  'onDragEnd' |
  'onMouseOut' |
  'onMouseOver' |
  'onRightClick';

export type MapsObjectEventName = 'click' |
  'dblclick' |
  'drag' |
  'dragstart' |
  'dragend' |
  'mouseout' |
  'mouseover' |
  'rightclick';

export interface MapsObjectEventProps {
  onClick?: google.maps.MapMouseEventHandler;
  onDblClick?: google.maps.MapMouseEventHandler;
  onDrag?: google.maps.MapMouseEventHandler;
  onDragStart?: google.maps.MapMouseEventHandler;
  onDragEnd?: google.maps.MapMouseEventHandler;
  onMouseOut?: google.maps.MapMouseEventHandler;
  onMouseOver?: google.maps.MapMouseEventHandler;
  onRightClick?: google.maps.MapMouseEventHandler;
}

export const mapsObjectEventNames: {
  [key in MapsObjectHandlerName]: MapsObjectEventName;
} = {
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragStart: 'dragstart', 
  onDragEnd: 'dragend',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onRightClick: 'rightclick',
};
