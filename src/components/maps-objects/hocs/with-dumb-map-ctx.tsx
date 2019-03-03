import React from 'react';
import {
  MapContext,
  WrappedProps,
} from './with-smart-map-ctx';
import { MapStore } from '../';

export const withDumbMapCtx = <Store extends MapStore, Props extends {}>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
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
