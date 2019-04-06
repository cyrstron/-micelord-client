import {ReactNode, ComponentType} from 'react';

export interface TilesOverlayProps {
  children?: (props: {
    tileCoord: google.maps.Point,
    zoom: number,
  }) => ReactNode | null;
  TileComponent?: ComponentType<{
    tileCoord: google.maps.Point,
    zoom: number,
  }>;
}
