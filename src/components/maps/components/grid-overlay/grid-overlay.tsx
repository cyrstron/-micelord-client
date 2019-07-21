import React, {Component} from 'react';
import {SmartTilesOverlay} from '@maps/tiles-overlay';
// import {StaticGrider, createBorderRenderer, BorderRenderer} from '@micelord/grider';
import {GridTile} from '../grid-tile/grid-tile';
// import {SmartMarker, SmartPolyline} from '@maps/feature';
import {TileMercPoint, IndexatedFigure} from '@micelord/grider'
import { GridParams } from '@micelord/grider/src';

interface Props {
  params: GridParams;
  borderline: IndexatedFigure,
}

export class GridOverlay extends Component<Props> {
  render() {
    const {
      params,
      borderline,
    } = this.props;
    return (
      <>
        <SmartTilesOverlay width={512}>
          {({tileCoord: {x, y}, zoom, width, height}) => {
            const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);
            
            return (
              <GridTile 
                tilePoint={tilePoint}
                params={params}
                // borderRenderer={this.borderRenderer}
                borderline={borderline}
                // border={border}
              />
            )
          }}
        </SmartTilesOverlay>
      </>
    )
  }
}
