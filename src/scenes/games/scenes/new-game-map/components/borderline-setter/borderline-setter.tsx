import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { EditableBorderline } from './editable-borderline';
import { MapBroadcaster } from 'react-google-maps-ts';
import { GeoPoint } from '@micelord/grider';

export interface BorderlineSetterProps {
  newGameStore?: NewGameStore;
}

@inject('newGameStore')
@observer
class BorderlineSetter extends Component<BorderlineSetterProps> {
  onPointAdd = (e: google.maps.MouseEvent) => {
    const point = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    const {newBorderStore} = this.props.newGameStore!;
    
    newBorderStore.insertNearSelected(point);
  }

  onPointChange = (e: google.maps.MouseEvent) => {
    const {newGameStore} = this.props;

    const point = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    newGameStore!.newBorderStore.updateSelectedPoint(point);
  }

  render() {
    return (
      <>
        <EditableBorderline />
        <MapBroadcaster 
          onRightClick={this.onPointAdd}
          onClick={this.onPointChange}
        />
      </>
    )
  }
}

export {BorderlineSetter};
