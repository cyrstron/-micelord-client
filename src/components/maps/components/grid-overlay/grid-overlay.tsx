import React, {Component} from 'react';
import {SmartTilesOverlay} from '@maps/tiles-overlay';
import {StaticGrider, createBorderRenderer, BorderRenderer} from '@micelord/grider';
import {GridTile} from '../grid-tile/grid-tile';

interface Props {
  grider: StaticGrider;
  borderline: google.maps.LatLngLiteral[],
  border: google.maps.LatLngLiteral[],
}

export class GridOverlay extends Component<Props> {
  borderRenderer: BorderRenderer;

  constructor(props: Props) {
    super(props);

    const {
      borderline,
      border,
      grider,
    } = props;

    this.borderRenderer = createBorderRenderer(grider.params, borderline, border);
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
    )
  }
}
