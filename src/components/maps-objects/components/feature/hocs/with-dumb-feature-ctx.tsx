import React from 'react';
import {FeatureService} from '../services';
import {FeatureStore} from '../stores';
import {WrappedProps} from './with-full-feature-ctx';
import {FeatureContext} from './with-smart-feature-ctx';

export const withDumbFeatureCtx = <
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
  >,
  Props extends {}
>(
  Wrapped: React.ComponentType<Props & WrappedProps<Store>>,
) => {
  const WithDumbFeatureCtx = (props: Props) => (
    <FeatureContext.Consumer>
      {({featureStore}) => {
        if (!featureStore) return null;

        return <Wrapped featureStore={featureStore as Store} {...props}/>;
      }}
    </FeatureContext.Consumer>
  );

  return WithDumbFeatureCtx;
};
