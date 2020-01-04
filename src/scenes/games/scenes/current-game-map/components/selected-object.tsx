import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CurrentGameStore } from '@scenes/games/stores/current-game-store';
import { Cell } from '@micelord/grider';
import { Polygon } from 'react-google-maps-ts';

export interface SelectedObjectProps {
  currentGameStore?: CurrentGameStore;
}

@inject('currentGameStore')
@observer
class SelectedObject extends Component<SelectedObjectProps> {
  render() {    
    const {selectedObject} = this.props.currentGameStore!;

    if (!selectedObject) return null;

    if (selectedObject instanceof Cell) {
      return (
        <Polygon
          paths={selectedObject.points}
          strokeColor="#22b"
          fillColor="transparent"
          strokeWeight={2}
        />
      )
    } else {
      return null;
    }
  }
}

export {SelectedObject};
