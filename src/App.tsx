import classNames from 'classnames/bind';
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import { AuthRoute } from '@components/auth-route';
import { Header } from '@components/header/header';
import {PositionMap} from '@components/maps';
import { SignUp } from '@components/sign-up';
import { SignIn } from '@components/sign-in';

import styles from './app.scss';

const cx = classNames.bind(styles);

class App extends Component<{}, {string: string}> {
  render() {
    return (
      <div className={cx('App')}>
        <Header className={cx('App-header')} />
        <main className={cx('App-main')}>
          <Route path='/sign-up' component={SignUp} />
          <Route path='/sign-in' component={SignIn} />
          <AuthRoute path='/' component={PositionMap} exact />
        </main>
      </div>
    );
  }
}

export default App;
