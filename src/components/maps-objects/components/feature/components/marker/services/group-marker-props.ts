import {filterObject} from '../../../../../services';

interface SortedMarkerProps {
  options?: google.maps.MarkerOptions;
  handlers?: {[key: string]: any};
}

export const groupMarkerProps = ({
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseOut,
  onMouseOver,
  onRightClick,
  onAnimationChanged,
  onClickableChanged,
  onCursorChanged,
  onDraggableChanged,
  onFlatChanged,
  onIconChanged,
  onMouseDown,
  onMouseUp,
  onPositionChanged,
  onShapeChanged,
  onTitleChanged,
  onVisibleChanged,
  onZIndexChanged,
  ...options
}: MarkerEventsProps & google.maps.MarkerOptions): SortedMarkerProps => {
  const result: SortedMarkerProps = {
    options,
  };

  const handlers = filterObject<any>({
    onAnimationChanged,
    onClick,
    onClickableChanged,
    onCursorChanged,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onDraggableChanged,
    onFlatChanged,
    onIconChanged,
    onMouseDown,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onPositionChanged,
    onRightClick,
    onShapeChanged,
    onTitleChanged,
    onVisibleChanged,
    onZIndexChanged,
  });

  if (handlers) {
    result.handlers = handlers;
  }

  return result;
};
