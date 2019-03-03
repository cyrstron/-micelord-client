import {Provider as MobxProvider} from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import App from './app';
import {configureStore} from './state';
import {GoogleMapsStore, GeolocationStore} from './stores';
import './index.scss';

const stores = {
  geolocationStore: new GeolocationStore(),
  googleMapsStore: new GoogleMapsStore(process.env.GOOGLE_MAPS_KEY!),
};

ReactDOM.render((
  <ReduxProvider store={configureStore()}>
    <MobxProvider
      {...stores}
    >
      <App />
    </MobxProvider>
  </ReduxProvider>
), document.getElementById('root'));
