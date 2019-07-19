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
      // border
    } = this.props;
    return (
      <>
        <SmartTilesOverlay width={512}>
          {({tileCoord: {x, y}, zoom, width, height}) => {
            const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);
            // const geoPoint = tilePoint.toSphere();
            // const semiGeo = geoPoint.toSemiSphere();
            // const geoPoint2 = semiGeo.fromSemiSphere();
            // const mercPoint = geoPoint.toMerc();
            
            // return (
            //   <div style={{
            //     border: '1px dashed green',
            //     backgroundColor: 'rgba(255, 255, 255, 0.7)',
            //     textAlign: 'left',
            //     padding: '5px'
            //   }}>
            //     tileX: {tilePoint.tileX}, tileY: {tilePoint.tileY}
            //     <br/>
            //     x: {tilePoint.x}, y: {tilePoint.y}
            //     <br/>
            //     fromGeoX: {mercPoint.x}, fromGeoY: {mercPoint.y}
            //     <br/>
            //     lng: {geoPoint.lng}, lat: {geoPoint.lat}
            //     <br/>
            //     lngSemi: {semiGeo.lng}, latSemi: {semiGeo.lat}
            //     <br/>
            //     fromSemiLng: {geoPoint2.lng}, fromSemiLat: {geoPoint2.lat}
            //   </div>
            // )

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
