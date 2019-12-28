import React, { Component } from 'react';
import { Marker, withGoogleApi } from 'react-google-maps-ts';
import { GeoPointStore } from '@scenes/games/stores/point-store';
import { observer } from 'mobx-react';

export interface PointSetterProps {
  pointStore: GeoPointStore;
  index: number;
  selectPoint: (index: number) => void;
  deletePoint: (index: number) => void;
  resetBorder: () => void;
  isSelected: boolean;
}

type Props = PointSetterProps & {
  googleApi: Google;
};

@observer
class PointSetterComponent extends Component<Props> {
  pointIcon: google.maps.Symbol;
  selectedPointIcon: google.maps.Symbol;

  constructor(props: Props) {
    super(props);

    const {googleApi} = props;

    this.pointIcon = {
      path: googleApi.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#02d",
      strokeColor: "#333",
      fillOpacity: 0.65,
      strokeOpacity: 1,
      strokeWeight: 5
    };

    this.selectedPointIcon = {
      path: googleApi.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#d20",
      strokeColor: "#0a0",
      fillOpacity: 0.65,
      strokeOpacity: 0.75,
      strokeWeight: 10
    };
  }

  onClick = () => {
    const {index, selectPoint} = this.props;

    selectPoint(index);
  }

  onRightClick = () => {
    const {index, deletePoint} = this.props;

    deletePoint(index);
  }

  onDragStart = () => {
    const {index, selectPoint} = this.props;

    selectPoint(index);
  }

  onDrag = (e: google.maps.MouseEvent) => {
    const {pointStore, resetBorder} = this.props;

    const point = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    pointStore.setPoint(point);

    resetBorder();
  }

  render() {
    const {
      pointStore: {value},
      index,
      isSelected,
    } = this.props;

    return (
      <Marker 
        icon={isSelected ? this.selectedPointIcon : this.pointIcon}
        title={`Border point #${index}`}
        position={value}
        onDrag={this.onDrag}
        onClick={this.onClick}
        onDragStart={this.onDragStart}
        onRightClick={this.onRightClick}
        crossOnDrag={false}
        zIndex={isSelected ? 5 : 0}
        draggable
      />
    );
  }
}

const PointSetter = withGoogleApi<PointSetterProps>(PointSetterComponent)

export {PointSetter}