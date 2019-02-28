import React from 'react';
import {WrappedProps} from './with-full-overlay-ctx';
import {OverlayContext} from './with-smart-overlay-ctx';

export const withDumbOverlayCtx = <
  Store extends {
    remove(): void;
  },
  Props extends {}
>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  const WithDumbOverlayCtx = (props: Props) => (
    <OverlayContext.Consumer>
      {({overlayStore}) => {
        if (!overlayStore) return null;

        return <Wrapped overlayStore={overlayStore as Store} {...props}/>;
      }}
    </OverlayContext.Consumer>
  );

  return WithDumbOverlayCtx;
};
