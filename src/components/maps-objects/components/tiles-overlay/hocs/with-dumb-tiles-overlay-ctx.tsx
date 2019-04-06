import React from 'react';
import {WrappedProps} from './with-full-tiles-overlay-ctx';
import {TilesOverlayContext} from './with-smart-tiles-overlay-ctx';

export const withDumbTilesOverlayCtx = <
  Store extends {
    remove(): void;
  },
  Props extends {}
>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  const WithDumbTilesOverlayCtx = (props: Props) => (
    <TilesOverlayContext.Consumer>
      {({overlayStore}) => {
        if (!overlayStore) return null;

        return <Wrapped overlayStore={overlayStore as Store} {...props}/>;
      }}
    </TilesOverlayContext.Consumer>
  );

  return WithDumbTilesOverlayCtx;
};
