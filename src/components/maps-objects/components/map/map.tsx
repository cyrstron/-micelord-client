import {observer} from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import {WrappedProps} from '../../hocs/with-smart-map-ctx';
import {MapStore} from './stores';

export type MapComponentProps = MapProps & {
  children?: ReactNode | null;
};

type Props = WrappedProps<MapStore> & MapComponentProps;

@observer
export class Map extends Component<Props, {}> {
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
  }: Props) {
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
