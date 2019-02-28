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
import {FeatureService} from '../services';
import {FeatureStore} from '../stores';

export interface WrappedProps<Store> {
  featureStore: Store;
}

export const withFullFeatureCtx = <
  EventName,
  Options,
  EventHandler,
  HandlerName,
  Feature extends google.maps.Feature<
    EventName,
    Options,
    EventHandler
  >,
  Service extends FeatureService<
    Feature,
    EventName,
    Options,
    EventHandler
  >,
  Store extends FeatureStore<
    Feature,
    Options,
    EventName,
    HandlerName,
    EventHandler,
    Service
  >
>(
  ComponentStore: new(google: Google, mapService: MapService) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  @inject('googleMapsStore')
  @observer
  class WithFullFeatureCtx extends Component<Props & WrappedMapProps<MapStore> & GoogleStoreProps, {}> {
    @observable featureStore?: Store;

    componentDidMount() {
      const {
        mapStore,
        googleMapsStore,
      } = this.props;

      const {google} = googleMapsStore as GoogleMapsStore;

      this.featureStore = new ComponentStore(google as Google, mapStore.service as MapService);
    }

    componentWillUnmount() {
      const {featureStore} = this;

      if (!featureStore) return;

      featureStore.remove();
    }

    render() {
      const {featureStore} = this;
      const {
        mapStore,
        googleMapsStore,
        ...props
      } = this.props;

      if (!featureStore) return null;

      return (
        <Wrapped featureStore={featureStore} {...props as Props}/>
      );
    }
  }

  return withDumbMapCtx<MapStore, Props>(WithFullFeatureCtx);
};
