import React, {createContext} from 'react';
import {MapService} from '../../map';
import {FeatureService} from '../services';
import {FeatureStore} from '../stores';
import {withFullFeatureCtx, WrappedProps} from './with-full-feature-ctx';

interface ContextValue {
  featureStore?: any;
}

export const FeatureContext = createContext<ContextValue>({});

export const withSmartFeatureCtx = <
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
  ComponentStore: new(google: Google, mapStore: MapService) => Store,
) => <Props extends {}>(
  Wrapped: React.ComponentType<WrappedProps<Store> & Props>,
) => {
  const WithSmartFeatureCtx = (props: Props & WrappedProps<Store>) => (
    <FeatureContext.Provider
      value={{featureStore: props.featureStore}}
    >
      <Wrapped
        {...props}
      />
    </FeatureContext.Provider>
  );
  return withFullFeatureCtx<
    EventName,
    Options,
    EventHandler,
    HandlerName,
    Feature,
    Service,
    Store
  >(ComponentStore)<Props>(WithSmartFeatureCtx);
};
