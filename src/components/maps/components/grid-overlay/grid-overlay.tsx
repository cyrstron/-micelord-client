import React, {Component} from 'react';
import {TilesOverlay} from 'react-google-maps-ts';
import {GridTile} from '../grid-tile/grid-tile';
import {
  TileMercPoint, 
  IndexatedFigure, 
  GridParams, 
  MapGridTile, 
  Point
} from '@micelord/grider';
import { CacheService } from '@services/cache-service';

interface Props {
  params?: GridParams;
  borderline?: IndexatedFigure,
}

interface TileData {
  border: Point[];
  mapTile: MapGridTile;
}

interface GridTilePayload {
  tileCoord: google.maps.Point,
  zoom: number,
  width: number,
  height: number,
}

export class GridOverlay extends Component<Props> {
  tilesCache: CacheService<TileData> = new CacheService({
    minSize: 500,
    maxSize: 1000
  });

  componentWillUpdate(prevProps: Props) {
    const {params, borderline} = this.props;

    if (
      params === prevProps.params && 
      borderline === prevProps.borderline
    ) return;

    this.tilesCache.reset();
  }

  extendPayload = async ({
    tileCoord: {x, y}, 
    zoom,
    width,
    height,
  }: GridTilePayload): Promise<any> => {
    const {params, borderline} = this.props;    

    if (!params) return;

    const cacheKey = `${x}-${y}-${zoom}-${width}-${height}`;
    const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);

    const cached = this.tilesCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const mapTile = await MapGridTile.fromTilePoint(tilePoint, params);

      let border: Point[] = [];

      if (borderline) {
        border = await borderline.tilePoints(tilePoint);
      }

      const result = {mapTile, border};

      this.tilesCache.set(cacheKey, result);

      return result;
    } catch (err) {
      console.error(err);
    }
  }
  
  render() {
    const {
      params,
      borderline,
    } = this.props;

    return (
      <TilesOverlay
        width={512}
        extendPayload={this.extendPayload}
        index={1}
        watchProps={[params, borderline]}
      >
        {({tileCoord: {x, y}, zoom, width, height, data}) => {
          if (!data || !params) return null;

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
