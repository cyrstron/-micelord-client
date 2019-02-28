import React from 'react';
import {
  MapContext,
  WrappedProps as MapWrappedProps,
} from './with-smart-map-ctx';

export const withDumbMapCtx = <Store, Props extends {}>(
  Wrapped: React.ComponentType<Props & MapWrappedProps<Store>>,
) => {
  const WithDumbMapCtx = (props: Props) => (
    <MapContext.Consumer>
    {({mapStore}) => {
      if (!mapStore) return null;

      return <Wrapped mapStore={mapStore} {...props}/>;
    }}
    </MapContext.Consumer>
  );

  return WithDumbMapCtx;
};
