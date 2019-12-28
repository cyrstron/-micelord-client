import classNames from 'classnames/bind';
import React, { Component, createRef, createContext } from 'react';
import {Route, Switch} from 'react-router-dom';

import { AuthRoute } from '@components/auth-route';
import { Header } from '@components/header';
import { SignUp } from '@scenes/sign-up';
import { SignIn } from '@scenes/sign-in';
import { Games } from '@scenes/games';
import { Home } from '@scenes/home';

import styles from './app.scss';

const cx = classNames.bind(styles);

export const PopupContext = createContext<HTMLDivElement | undefined>(undefined);

interface AppState {
  popupContainer?: HTMLDivElement; 
}

class App extends Component<{}, AppState> {
  state: AppState = {};

  componentDidMount() {
    const {current} = this.popupRef;

    if (!current) return;

    this.setState({ popupContainer: current})
  }
  
  popupRef = createRef<HTMLDivElement>();

  render() {
    const {popupContainer} = this.state;

    return (
      <>
        <PopupContext.Provider value={popupContainer}>
          <div className={cx('App')}>
            <Header className={cx('App-header')} />
            <main className={cx('App-main')}>
              <Switch>
                <Route path='/sign-up' component={SignUp} />
                <Route path='/sign-in' component={SignIn} />
                <AuthRoute 
                  path='/games' 
                  render={() => (
                    <Games className={cx('games')} />
                  )}
                />
                <AuthRoute path='/' component={Home} exact />
              </Switch>
            </main>
          </div>
        </PopupContext.Provider>
        <div ref={this.popupRef} />
      </>
    );
  }
}

export default App;
