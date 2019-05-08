import React, {Component} from 'react';
import {SmartTilesOverlay} from '@maps/tiles-overlay';
import {StaticGrider, createBorderRenderer, BorderRenderer} from '@micelord/grider';
import {GridTile} from '../grid-tile/grid-tile';
import {SmartMarker} from '@maps/feature';

interface Props {
  grider: StaticGrider;
  borderline: google.maps.LatLngLiteral[],
  border: google.maps.LatLngLiteral[],
}

export class GridOverlay extends Component<Props> {
  borderRenderer: BorderRenderer;
  // distribution: {[key: string]: google.maps.LatLngLiteral[]};

  constructor(props: Props) {
    super(props);

    const {
      borderline,
      border,
      grider,
    } = props;

    this.borderRenderer = createBorderRenderer(grider.params, borderline, border);
    // this.distribution = this.borderRenderer.distributePoints();
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
      {/* {this.distribution[0].map((point, index) => (
        <SmartMarker 
          position={point}
          title={`${index}`}
        />
      ))} */}
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
