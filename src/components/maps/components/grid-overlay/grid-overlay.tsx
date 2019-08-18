import React, {Component} from 'react';
import {TilesOverlay} from '@micelord/maps';
import {GridTile} from '../grid-tile/grid-tile';
import {TileMercPoint, IndexatedFigure, GridParams, MapGridTile, Point} from '@micelord/grider';

interface Props {
  params: GridParams;
  // borderline: IndexatedFigure,
}

interface TileData {
  // borderPoly: Point[] | null;
  mapTile: MapGridTile;
}

const tileWidth = 512;

export class GridOverlay extends Component<Props> {
  extendPayload = async ({
    tileCoord: {x, y}, 
    zoom
  } : {
      tileCoord: google.maps.Point,
      zoom: number,
    }
  ): Promise<any> => {
    const {params} = this.props;    
    const tilePoint = TileMercPoint.fromTile(x, y, tileWidth, tileWidth, zoom);

    try {
      const mapTile = await MapGridTile.fromTilePoint(tilePoint, params);

      return {mapTile};
    } catch (err) {
      console.error('Grid tile error!');
      console.error(tilePoint);
      console.error(params);
      console.error(err);
    }
  }
  
  render() {
    const {
      params,
      // borderline,
    } = this.props;
    return (
      <TilesOverlay
        width={tileWidth}
        extendPayload={this.extendPayload}
        index={1}
      >
        {({tileCoord: {x, y}, zoom, width, height, data}) => {
          if (!data) return null;

          const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);
          const {mapTile} = data as TileData;
          
          return (
            <GridTile 
              tilePoint={tilePoint}
              params={params}
              mapTile={mapTile}
              // borderline={borderline}
            />
          )
        }}
      </TilesOverlay>
    )
  }
}
