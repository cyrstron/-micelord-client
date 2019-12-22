import React, { Component } from 'react';
import { Polyline } from 'react-google-maps-ts';
import { inject, observer } from 'mobx-react';
import { NewGameStore } from '@scenes/games/stores/new-game-store';

export interface BorderlineProps {
  newGameStore?: NewGameStore
}

@inject('newGameStore')
@observer
class Borderline extends Component<BorderlineProps> {
  lineIcons: google.maps.IconSequence[];

  constructor(props: BorderlineProps) {
    super(props);

    this.lineIcons = [{
      icon: {
        path: 'M 0,0 0,0',
        strokeOpacity: 1,
        strokeWeight: 4,
        scale: 1,
      },
      offset: '0',
      repeat: '10px',
    }];
  }

  render() {
    const {polyline} = this.props.newGameStore!.newBorderStore;

    if (polyline.length < 2) return null;

    return (
      <Polyline
        path={polyline}
        icons={this.lineIcons}
        strokeOpacity={0}
        strokeColor='#00aa00'
      />
    );
  }
};

export {Borderline}