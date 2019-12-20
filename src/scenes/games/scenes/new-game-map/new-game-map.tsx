import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { GridOverlay } from '@components/maps/components/grid-overlay/grid-overlay';
import { NewGameStore } from '@scenes/games/stores/new-game-store';

interface NewGameMapProps {
  newGameStore?: NewGameStore
}

@inject('newGameStore')
@observer
export class NewGameMap extends Component<NewGameMapProps> {
  render() {
    const {gridParams} = this.props.newGameStore!

    return (
      <>
        <GridOverlay 
          params={gridParams}
        />
      </>
    );
  }
}
