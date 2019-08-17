import React, {Component} from 'react';
import {TilesOverlay} from '@micelord/maps';
import {GridTile} from '../grid-tile/grid-tile';
import {TileMercPoint, IndexatedFigure, GridParams} from '@micelord/grider';

interface Props {
  params: GridParams;
  // borderline: IndexatedFigure,
}

export class GridOverlay extends Component<Props> {
  render() {
    const {
      params,
      // borderline,
    } = this.props;
    return (
      <>
        <TilesOverlay 
          width={512}
          index={1}
        >
          {({tileCoord: {x, y}, zoom, width, height}) => {
            const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);
            
            return (
              <GridTile 
                tilePoint={tilePoint}
                params={params}
                // borderline={borderline}
              />
            )
          }}
        </TilesOverlay>
      </>
    )
  }
}
