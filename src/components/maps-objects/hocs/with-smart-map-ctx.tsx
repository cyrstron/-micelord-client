import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component, createContext} from 'react';
import {GoogleMapsStore} from '../../../stores';
import {MapStore} from '../components/map';

export interface GoogleStoreProps {
  googleMapsStore?: GoogleMapsStore;
}

export interface WrappedProps<Store extends MapStore> {
  mapStore: Store
}

export interface ContextValue {
  mapStore?: any,
}

export const MapContext = createContext<ContextValue>({});

export const withSmartMapCtx = <Store extends MapStore>(
  Store: new(google: Google) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  @inject('googleMapsStore')
  @observer
  class WithSmartMapCtx extends Component<Props & GoogleStoreProps, {}> {
    @observable isStoreCreated: boolean = false;
    googleMapsStore: GoogleMapsStore;
    mapStore?: Store;

    constructor(props: Props & GoogleStoreProps) {
      super(props);

      this.googleMapsStore = props.googleMapsStore!;
    }

    async componentDidMount(): Promise<void> {
      const {googleMapsStore} = this;

      await googleMapsStore.init();

      if (!googleMapsStore.isLoaded) return;

      this.mapStore = new Store(this.googleMapsStore.google as Google);
      this.isStoreCreated = true;
    }

    render() {
      const {mapStore} = this;
      const {
        googleMapsStore,
        ...props
      } = this.props;

      if (!this.googleMapsStore.isLoaded || !this.isStoreCreated) return null;

      return (
        <MapContext.Provider
          value={{mapStore}}
        >
          <Wrapped
            mapStore={mapStore as Store}
            {...props as Props}
          />
        </MapContext.Provider>
      );
    }
  }

  return WithSmartMapCtx;
};
