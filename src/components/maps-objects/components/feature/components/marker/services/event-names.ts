import {featureEventNames} from '../../../services';

export const markerEventNames: MarkerEventNames = {
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
