import React, { Component } from 'react';
import { Marker } from 'react-google-maps-ts';
import { GeoPointStore } from '@scenes/games/stores/point-store';
import { observer } from 'mobx-react';

export interface PointSetterProps {
  pointStore: GeoPointStore;
  index: number;
  selectPoint: (index: number) => void;
  isSelected: boolean;
}

@observer
class PointSetter extends Component<PointSetterProps> {
  onClick = () => {
    const {index, selectPoint} = this.props;

    selectPoint(index);
  }

  onDrag = (e: google.maps.MouseEvent) => {
    const {pointStore} = this.props;

    const point = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    pointStore.setPoint(point);
  }

  render() {
    const {
      pointStore: {value},
      index,
    } = this.props;

    return (
      <Marker 
        title={`Border point #${index}`}
        position={value}
        onDrag={this.onDrag}
        onClick={this.onClick}
        draggable
      />
    );
  }
}

export {PointSetter}