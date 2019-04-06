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
  overlayStore: Store & {
    remove(): void;
  };
}

export const withFullTilesOverlayCtx = <Store extends {
  remove(): void;
}>(
  OverlayStore: new(google: Google, mapService: MapService) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  @inject('googleMapsStore')
  @observer
  class WithFullTilesOverlayCtx extends Component<Props & WrappedMapProps<MapStore> & GoogleStoreProps, {}> {
    @observable overlayStore?: Store;

    componentDidMount() {
      const {
        mapStore,
        googleMapsStore,
      } = this.props;

      const {google} = googleMapsStore as GoogleMapsStore;

      this.overlayStore = new OverlayStore(google as Google, mapStore.service as MapService);
    }

    componentWillUnmount() {
      const {overlayStore} = this;

      if (!overlayStore) return;

      overlayStore.remove();
    }

    render() {
      const {overlayStore} = this;
      const {
        mapStore,
        googleMapsStore,
        ...props
      } = this.props;

      if (!overlayStore) return null;

      return (
        <Wrapped overlayStore={overlayStore} {...props as Props}/>
      );
    }
  }

  return withDumbMapCtx<MapStore, Props>(WithFullTilesOverlayCtx);
};
