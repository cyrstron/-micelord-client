import throttle from 'lodash/throttle';
import React, {Component} from 'react';
import {Map} from '../map';
import {MapExtendedProps} from '../map/map';
import {CtrlMapStore} from './stores';

interface CtrlMapProps extends MapExtendedProps<CtrlMapStore> {
  mapStore: CtrlMapStore;
}

export class CtrlMap extends Component<CtrlMapProps, {}> {
  onBoundsChanged = throttle(() => {
    const {
      onBoundsChanged,
      mapStore,
    } = this.props;

    mapStore.updateBounds();

    if (!onBoundsChanged) return;

    onBoundsChanged();
  }, 200);

  onCenterChanged = throttle(() => {
    const {
      onCenterChanged,
      mapStore,
    } = this.props;

    mapStore.updateCenter();

    if (!onCenterChanged) return;

    onCenterChanged();
  }, 200);

  onZoomChanged = throttle(() => {
    const {
      onZoomChanged,
      mapStore,
    } = this.props;

    mapStore.updateZoom();

    if (!onZoomChanged) return;

    onZoomChanged();
  }, 200);

  render() {
    const {
      onBoundsChanged,
      onCenterChanged,
      onZoomChanged,
      mapStore,
      ...props
    } = this.props;
    return (
      <Map
        {...props}
        mapStore={mapStore}
        onBoundsChanged={this.onBoundsChanged}
        onCenterChanged={this.onCenterChanged}
        onZoomChanged={this.onZoomChanged}
      />
    );
  }
}
