import React, {Component} from 'react';
import {SmartTilesOverlay} from '@maps/tiles-overlay';
import {StaticGrider} from '@micelord/grider';

interface Props {
  grider: StaticGrider;
}

export class GridOverlay extends Component<Props> {
  render() {
    return (
      <SmartTilesOverlay>
        {({tileCoord, zoom}) => (
          <span>
            {zoom}/
            {tileCoord.toString()}
          </span>
        )}
      </SmartTilesOverlay>
    )
  }
}
