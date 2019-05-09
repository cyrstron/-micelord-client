import React, {Component} from 'react';
import {SmartTilesOverlay} from '@maps/tiles-overlay';
import {StaticGrider, createBorderRenderer, BorderRenderer} from '@micelord/grider';
import {GridTile} from '../grid-tile/grid-tile';
import {SmartMarker, SmartPolyline} from '@maps/feature';

interface Props {
  grider: StaticGrider;
  borderline: google.maps.LatLngLiteral[],
  border: google.maps.LatLngLiteral[],
}

export class GridOverlay extends Component<Props> {
  borderRenderer: BorderRenderer;
  distribution: {point: google.maps.LatLngLiteral, index: number}[][];

  constructor(props: Props) {
    super(props);

    const {
      borderline,
      border,
      grider,
    } = props;

    this.borderRenderer = createBorderRenderer(grider.params, borderline, border);
    this.distribution = this.borderRenderer.distributePoints();
  }

  shouldComponentUpdate(nextProps: Props) {
    const {
      grider,      
    } = this.props;

    return grider !== nextProps.grider;
  }

  render() {
    const {
      grider,
      borderline,
      border
    } = this.props;
    return (
      <>
      {this.distribution[0].map(({point, index}) => (
        <SmartMarker 
          position={point}
          title={`${index}`}
        />
      ))}
      {/* <SmartMarker 
        position={{lat: 54.2285004, lng: 24.7708037}}
        title={'lal'}
      /> */}
      <SmartPolyline 
        path={this.distribution[0].map(({point}) => point)}
        strokeColor='#ff0000'
      />
      <SmartPolyline 
        path={this.distribution[1].map(({point}) => point)}
        strokeColor='#00ff00'
      />
      <SmartPolyline 
        path={this.distribution[2].map(({point}) => point)}
        strokeColor='#0000ff'
      />
      <SmartPolyline 
        path={this.distribution[3].map(({point}) => point)}
        strokeColor='#ff00ff'
      />
      <SmartPolyline 
        path={this.distribution[4].map(({point}) => point)}
        strokeColor='#ffff00'
      />
      <SmartPolyline 
        path={this.distribution[5].map(({point}) => point)}
        strokeColor='#ffffff'
      />
      <SmartTilesOverlay width={512}>
        {(tileConfig) => (
          <GridTile 
            {...tileConfig}
            grider={grider}
            borderRenderer={this.borderRenderer}
            borderline={borderline}
            border={border}
          />
        )}
      </SmartTilesOverlay>
      </>
    )
  }
}
