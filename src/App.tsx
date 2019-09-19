import classNames from 'classnames/bind';
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import {PositionMap} from '@components/maps';
import { SignUp } from '@components/sign-up';

import styles from './app.scss';
import { AuthRoute } from '@components/auth-route';

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
        <main className={cx('App-main')}>
          <Route path='/sign-up' component={SignUp} />
          <AuthRoute path='/' component={PositionMap} exact />
        </main>
      </div>
    );
  }
}

export default App;
