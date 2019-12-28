import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { Borderline } from './components/borderline';
import { PointSetter } from './components/point-setter';
import {Polygon, Marker} from 'react-google-maps-ts';

export interface EditableBorderlineProps {
  newGameStore?: NewGameStore;
}

@inject('newGameStore')
@observer
class EditableBorderline extends Component<EditableBorderlineProps> {
  selectPoint = (index: number) => {
    const {newGameStore} = this.props;

    newGameStore!.newBorderStore.selectPoint(index);
  }

  deletePoint = (index: number) => {
    const {newGameStore} = this.props;

    newGameStore!.newBorderStore.deletePoint(index);
  }

  resetBorder = () => {
    const {newGameStore} = this.props;

    newGameStore!.newBorderStore.onReset();
  }

  render() {
    const {newGameStore} = this.props;

    const {
      points, 
      selectedPointIndex,
      isPending,
      invalidCells,
      selfIntersections,
    } = newGameStore!.newBorderStore;

    return (
      <>
        {invalidCells.map((cell, index) => (
          <Polygon 
            key={index}
            paths={cell.points}
            fillColor='#a33'
          />
        ))}
        {selfIntersections.map((point, index) => (
          <Marker 
            key={index}
            position={point}
            title={`Self intersection #${index}`}
          />
        ))}
        {!isPending && points.map((pointStore, index) => (
          <PointSetter 
            selectPoint={this.selectPoint}
            deletePoint={this.deletePoint}
            resetBorder={this.resetBorder}
            isSelected={selectedPointIndex === index}
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
