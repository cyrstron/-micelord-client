import {Provider as MobxProvider} from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {GoogleApiProvider} from 'react-google-maps-ts';

import {configureStore} from './state';
import {GeolocationStore} from './stores';
import App from './app';

import './index.scss';


const stores = {
  geolocationStore: new GeolocationStore(),
};

ReactDOM.render((
  <Router>
    <ReduxProvider store={configureStore()}>
      <MobxProvider
        {...stores}
      >
        <GoogleApiProvider apiKey={process.env.GOOGLE_MAPS_KEY}>
          <App />
        </GoogleApiProvider>
      </MobxProvider>
    </ReduxProvider>
  </Router>
), document.getElementById('root'));
