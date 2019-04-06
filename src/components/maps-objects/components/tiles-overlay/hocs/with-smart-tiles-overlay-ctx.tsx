import React, {createContext} from 'react';
import {MapService} from '@maps/map';
import {withFullTilesOverlayCtx, WrappedProps} from './with-full-tiles-overlay-ctx';

interface ContextValue {
  overlayStore?: any;
}

export const TilesOverlayContext = createContext<ContextValue>({});

export const withSmartTilesOverlayCtx = <Store extends {
  remove(): void;
}>(
  TilesOverlayStore: new(google: Google, mapStore: MapService) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<WrappedProps<Store> & Props>,
) => {
  const WithSmartMapTypeCtx = (props: Props & WrappedProps<Store>) => (
    <TilesOverlayContext.Provider
      value={{overlayStore: props.overlayStore}}
    >
      <Wrapped
        {...props}
      />
    </TilesOverlayContext.Provider>
  );
  return withFullTilesOverlayCtx<Store>(TilesOverlayStore)<Props>(WithSmartMapTypeCtx);
};
