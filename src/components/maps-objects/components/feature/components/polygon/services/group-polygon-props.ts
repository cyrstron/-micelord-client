import {filterObject} from '../../../../../services';

interface SortedPolygonProps {
  options?: google.maps.PolygonOptions;
  handlers?: {[key: string]: PolygonEventHandler};
}

export const groupPolygonProps = ({
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseOut,
  onMouseOver,
  onRightClick,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  ...options
}: PolygonEventsProps & google.maps.PolygonOptions): SortedPolygonProps => {
  const result: SortedPolygonProps = {
    options,
  };

  const handlers = filterObject<PolygonEventHandler>({
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
  });

  if (handlers) {
    result.handlers = handlers;
  }

  return result;
};
