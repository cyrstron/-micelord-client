import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {GoogleMapsStore} from '../../../../../stores';
import {withDumbMapCtx} from '../../../hocs/with-dumb-map-ctx';
import {
  GoogleStoreProps,
  WrappedProps as WrappedMapProps,
} from '../../../hocs/with-smart-map-ctx';
import {MapService, MapStore} from '../../map';

export interface WrappedProps<Store> {
  mapTypeStore: Store & {
    remove(): void;
  };
}

export const withFullMapTypeCtx = <Store extends {
  remove(): void;
}>(
  OverlayStore: new(google: Google, mapService: MapService) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  @inject('googleMapsStore')
  @observer
  class WithFullFeatureCtx extends Component<Props & WrappedMapProps<MapStore> & GoogleStoreProps, {}> {
    @observable mapTypeStore?: Store;

    componentDidMount() {
      const {
        mapStore,
        googleMapsStore,
      } = this.props;

      const {google} = googleMapsStore as GoogleMapsStore;

      this.mapTypeStore = new OverlayStore(google as Google, mapStore.service as MapService);
    }

    componentWillUnmount() {
      const {mapTypeStore} = this;

      if (!mapTypeStore) return;

      mapTypeStore.remove();
    }

    render() {
      const {mapTypeStore} = this;
      const {
        mapStore,
        googleMapsStore,
        ...props
      } = this.props;

      if (!mapTypeStore) return null;

      return (
        <Wrapped mapTypeStore={mapTypeStore} {...props as Props}/>
      );
    }
  }

  return withDumbMapCtx<MapStore, Props>(WithFullFeatureCtx);
};
