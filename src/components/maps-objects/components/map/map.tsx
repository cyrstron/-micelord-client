import {observer} from 'mobx-react';
import React, { Component } from 'react';
import {WrappedProps} from '../../hocs/with-smart-map-ctx';
import {MapProps} from './map.d';

export type MapExtendedProps<MapStore> = MapProps & WrappedProps<MapStore>;

@observer
export class Map<MapStore> extends Component<MapExtendedProps<MapStore>, {}> {
  mapContainer?: HTMLDivElement;

  componentDidMount() {
    const {
      defaultCenter,
      mapStore,
      children,
      className,
      ...props
    } = this.props;

    mapStore.setMap(this.mapContainer!, {
      ...props,
      center: defaultCenter,
    });
  }

  componentDidUpdate({
    defaultCenter: _defaultCenter,
    mapStore: _mapStore,
    children: _children,
    className: _className,
    ...prevProps
  }: MapExtendedProps<MapStore>) {
    const {
      defaultCenter,
      mapStore,
      children,
      className,
      ...props
    } = this.props;

    mapStore.updateProps(prevProps, props);
  }

  mapRef = (mapContainer: HTMLDivElement) => {
    if (this.mapContainer) return;

    this.mapContainer = mapContainer;
  }

  render() {
    const {
      children,
      className,
      mapStore,
    } = this.props;

    return (
      <div className={className} ref={this.mapRef} >
        {mapStore.isLoaded && children}
      </div>
    );
  }
}
