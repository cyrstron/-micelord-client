import {Provider as MobxProvider} from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import App from './app';
import {configureStore} from './state';
import {GeolocationStore} from './stores';
import {GoogleApiProvider} from '@micelord/maps';
import './index.scss';

const stores = {
  geolocationStore: new GeolocationStore(),
};

ReactDOM.render((
  <ReduxProvider store={configureStore()}>
    <MobxProvider
      {...stores}
    >
      <GoogleApiProvider apiKey={process.env.GOOGLE_MAPS_KEY}>
        <App />
      </GoogleApiProvider>
    </MobxProvider>
  </ReduxProvider>
), document.getElementById('root'));
