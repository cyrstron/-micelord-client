import React, {Component} from 'react';
import {TilesOverlay} from '@micelord/maps';
import {GridTile} from '../grid-tile/grid-tile';
import {TileMercPoint, IndexatedFigure, GridParams, MapGridTile, Point} from '@micelord/grider';

interface Props {
  params: GridParams;
  borderline: IndexatedFigure,
}

interface TileData {
  border: Point[] | null;
  mapTile: MapGridTile;
}

export class GridOverlay extends Component<Props> {
  extendPayload = async ({
    tileCoord: {x, y}, 
    zoom,
    width,
    height,
  } : {
      tileCoord: google.maps.Point,
      zoom: number,
      width: number,
      height: number,
    }
  ): Promise<any> => {
    const {params, borderline} = this.props;    
    const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);

    try {
      const mapTile = await MapGridTile.fromTilePoint(tilePoint, params);
      const border = await borderline.tilePoints(tilePoint);

      return {mapTile, border};
    } catch (err) {
      console.error(err);
    }
  }
  
  render() {
    const {
      params,
    } = this.props;

    return (
      <TilesOverlay
        width={512}
        extendPayload={this.extendPayload}
        index={1}
      >
        {({tileCoord: {x, y}, zoom, width, height, data}) => {
          if (!data) return null;

          const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);
          const {mapTile, border} = data as TileData;
          
          return (
            <GridTile 
              tilePoint={tilePoint}
              params={params}
              mapTile={mapTile}
              border={border}
            />
          )
        }}
      </TilesOverlay>
    )
  }
}
