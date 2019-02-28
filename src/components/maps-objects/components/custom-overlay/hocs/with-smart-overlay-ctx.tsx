import React, {createContext} from 'react';
import {MapService} from '../../map';
import {withFullOverlayCtx, WrappedProps} from './with-full-overlay-ctx';

interface ContextValue {
  overlayStore?: any;
}

export const OverlayContext = createContext<ContextValue>({});

export const withSmartOverlayCtx = <Store extends {
  remove(): void;
}>(
  OverlayStore: new(google: Google, mapStore: MapService) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<WrappedProps<Store> & Props>,
) => {
  const WithSmartFeatureCtx = (props: Props & WrappedProps<Store>) => (
    <OverlayContext.Provider
      value={{overlayStore: props.overlayStore}}
    >
      <Wrapped
        {...props}
      />
    </OverlayContext.Provider>
  );
  return withFullOverlayCtx<Store>(OverlayStore)<Props>(WithSmartFeatureCtx);
};
