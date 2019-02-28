import React from 'react';
import {WrappedProps} from './with-full-map-type-ctx';
import {MapTypeContext} from './with-smart-map-type-ctx';

export const withDumbMapTypeCtx = <
  Store extends {
    remove(): void;
  },
  Props extends {}
>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  const WithDumbMapTypeCtx = (props: Props) => (
    <MapTypeContext.Consumer>
      {({mapTypeStore}) => {
        if (!mapTypeStore) return null;

        return <Wrapped mapTypeStore={mapTypeStore as Store} {...props}/>;
      }}
    </MapTypeContext.Consumer>
  );

  return WithDumbMapTypeCtx;
};
