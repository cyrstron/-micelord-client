import throttle from 'lodash/throttle';
import React, {Component, ReactNode} from 'react';
import {Map, MapComponentProps} from '../../map';
import {CtrlMapStore} from './stores';
import {WrappedProps} from '../../../../hocs/with-smart-map-ctx';

export type CtrlMapProps = MapComponentProps;

type Props = MapComponentProps & WrappedProps<CtrlMapStore>;

export class CtrlMap extends Component<Props, {}> {
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
