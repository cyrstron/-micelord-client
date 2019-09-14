import classNames from 'classnames/bind';
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import {PositionMap} from '@components/maps';
import { Auth } from '@components/auth';

import styles from './app.scss';

const cx = classNames.bind(styles);

class App extends Component<{}, {string: string}> {
  render() {
    return (
      <div className={cx('App')}>
        <header className={cx('App-header')}>
          <Link to='/auth'>
            Auth
          </Link>
        </header>
        <Route path='/' component={PositionMap} exact />
        <Route path='/auth' component={Auth} />
      </div>
    );
  }
}

export default App;
