import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CurrentGameStore } from '@scenes/games/stores/current-game-store';
import { Cell } from '@micelord/grider';
import { Polygon } from 'react-google-maps-ts';

export interface CurrentObjectProps {
  currentGameStore?: CurrentGameStore;
  onClick?: (e: google.maps.MouseEvent) => void;
}

@inject('currentGameStore')
@observer
class CurrentObject extends Component<CurrentObjectProps> {
  render() {
    const {onClick, currentGameStore} = this.props;

    const {currentObject} = currentGameStore!;

    if (!currentObject) return null;

    if (currentObject instanceof Cell) {
      return (
        <Polygon
          paths={currentObject.points}
          strokeColor="#b22"
          fillColor="transparent"
          strokeWeight={2}
          onClick={onClick}
        />
      )
    } else {
      return null;
    }
  }
}

export {CurrentObject};
