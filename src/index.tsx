import './index.css';

import {Provider as MobxProvider} from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import App from './App';
import {unregister} from './serviceWorker';
import {configureStore} from './state';
import {GoogleMapsStore} from './stores';
import {GeolocationStore} from './stores';

const stores = {
  geolocationStore: new GeolocationStore(),
  googleMapsStore: new GoogleMapsStore(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!),
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

unregister();
