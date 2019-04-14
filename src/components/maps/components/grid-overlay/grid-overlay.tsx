import React, {Component} from 'react';
import {SmartTilesOverlay} from '@maps/tiles-overlay';
import {StaticGrider} from '@micelord/grider';
import {GridTile} from '../grid-tile/grid-tile';

interface Props {
  grider: StaticGrider;
}

export class GridOverlay extends Component<Props> {
  render() {
    const {grider} = this.props;
    return (
      <SmartTilesOverlay width={512}>
        {(tileConfig) => (
          <GridTile 
            {...tileConfig}
            grider={grider}
          />
        )}
      </SmartTilesOverlay>
    )
  }
}
