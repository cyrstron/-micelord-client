import React, {Component} from 'react';
import {SmartTilesOverlay} from '@maps/tiles-overlay';
// import {StaticGrider, createBorderRenderer, BorderRenderer} from '@micelord/grider';
import {GridTile} from '../grid-tile/grid-tile';
import {SmartMarker, SmartPolyline} from '@maps/feature';
import {TileMercPoint} from '@micelord/grider'

interface Props {
  // grider: StaticGrider;
  // borderline: google.maps.LatLngLiteral[],
  // border: google.maps.LatLngLiteral[],
}

export class GridOverlay extends Component<Props> {
  // borderRenderer: BorderRenderer;
  // distribution: {point: google.maps.LatLngLiteral, index: number}[][];

  constructor(props: Props) {
    super(props);

    const {
      // borderline,
      // border,
      // grider,
    } = props;

    // this.borderRenderer = createBorderRenderer(grider.params, borderline, border);
    // this.distribution = this.borderRenderer.distributePoints();
  }

  // shouldComponentUpdate(nextProps: Props) {
  //   const {
  //     // grider,      
  //   } = this.props;

  //   // return grider !== nextProps.grider;
  // }

  render() {
    const {
      // grider,
      // borderline,
      // border
    } = this.props;
    return (
      <>
        <SmartTilesOverlay width={512}>
          {({tileCoord: {x, y}, zoom, width, height}) => {
            const tilePoint = TileMercPoint.fromTile(x, y, width, height, zoom);
            const geoPoint = tilePoint.toSphere().toFormatted();

            return (
            <div style={{border: '1px dotted green'}}>
              x: {tilePoint.x} y: {tilePoint.y}
              <br/>
              tileX: {tilePoint.tileX} tileY: {tilePoint.tileY}
              <br/>
              lat: {geoPoint.lat} lng: {geoPoint.lng}
            </div>
            // <GridTile 
            //   {...tileConfig}
            //   grider={grider}
            //   borderRenderer={this.borderRenderer}
            //   borderline={borderline}
            //   border={border}
            // />
          )}}
        </SmartTilesOverlay>
      </>
    )
  }
}
