import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { Borderline } from './components/borderline';
import { PointSetter } from './components/point-setter';

export interface EditableBorderlineProps {
  newGameStore?: NewGameStore;
}

@inject('newGameStore')
@observer
class EditableBorderline extends Component<EditableBorderlineProps> {
  selectPoint = (index: number) => {
    const {newGameStore} = this.props;

    newGameStore!.newBorderStore.editPoint(index);
  }

  render() {
    const {newGameStore} = this.props;

    const {points, editedPointIndex} = newGameStore!.newBorderStore;

    return (
      <>
        {points.map((pointStore, index) => (
          <PointSetter 
            selectPoint={this.selectPoint}
            isSelected={editedPointIndex === index}
            key={index}
            index={index}
            pointStore={pointStore}
          />
        ))}
        <Borderline />
      </>
    )
  }
}

export {EditableBorderline};
