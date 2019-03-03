import {filterObject} from '../../../services';

interface SortedMapProps {
  options?: google.maps.MapOptions;
  handlers?: {[key: string]: MapEventHandler};
}

export const groupMapProps = ({
  onBoundsChanged,
  onCenterChanged,
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onHeadingChanged,
  onIdle,
  onMaptypeIdChanged,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onProjectionChanged,
  onRightClick,
  onTilesLoaded,
  onTiltChanged,
  onZoomChanged,
  ...options
}: MapEventsProps & google.maps.MapOptions): SortedMapProps => {
  const result: SortedMapProps = {
    options,
  };

  const handlers = filterObject<MapEventHandler>({
    onBoundsChanged,
    onCenterChanged,
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onHeadingChanged,
    onIdle,
    onMaptypeIdChanged,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onProjectionChanged,
    onRightClick,
    onTilesLoaded,
    onTiltChanged,
    onZoomChanged,
  });

  if (handlers) {
    result.handlers = handlers;
  }

  return result;
};
