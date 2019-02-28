import React, {createContext} from 'react';
import {MapService} from '../../map';
import {withFullMapTypeCtx, WrappedProps} from './with-full-map-type-ctx';

interface ContextValue {
  mapTypeStore?: any;
}

export const MapTypeContext = createContext<ContextValue>({});

export const withSmartMapTypeCtx = <Store extends {
  remove(): void;
}>(
  MapTypeStore: new(google: Google, mapStore: MapService) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<WrappedProps<Store> & Props>,
) => {
  const WithSmartMapTypeCtx = (props: Props & WrappedProps<Store>) => (
    <MapTypeContext.Provider
      value={{mapTypeStore: props.mapTypeStore}}
    >
      <Wrapped
        {...props}
      />
    </MapTypeContext.Provider>
  );
  return withFullMapTypeCtx<Store>(MapTypeStore)<Props>(WithSmartMapTypeCtx);
};
