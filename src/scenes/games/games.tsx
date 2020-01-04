import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import classnames from 'classnames/bind';
import { NewGame } from './scenes/new-game';
import { CurrentGame } from './scenes/current-game';
import { GamesList } from './scenes/games-list';
import { GamesMap } from './scenes/games-map';
import { NewGameMap } from './scenes/new-game-map';
import { NewGameStore } from './stores/new-game-store';
import { Provider, inject, observer } from 'mobx-react';
import { CurrentGameMap } from './scenes/current-game-map';
import { CurrentGameStore } from './stores/current-game-store';
import { Game as GameType } from '@state/actions/games-requests/actions';
import { GeolocationStore } from '@stores/index';

import styles from './games.scss';

const cx = classnames.bind(styles);

export interface GamesProps {
  className?: string;
  currentGame?: GameType;
  geolocationStore?: GeolocationStore;
}

@inject('geolocationStore')
@observer
export class Games extends Component<GamesProps> {
  newGameStore: NewGameStore;
  currentGameStore: CurrentGameStore;

  constructor(props: GamesProps) {
    super(props);

    const {position} = props.geolocationStore!;

    this.newGameStore = new NewGameStore();
    this.currentGameStore = new CurrentGameStore(position!);
  }

  componentDidUpdate(prevProps: GamesProps) {
    const {currentGame, geolocationStore} = this.props;

    if (!currentGame && prevProps.currentGame) {
      this.currentGameStore.resetGame();
    } else if (currentGame && currentGame !== prevProps.currentGame) {
      this.currentGameStore.setGame(currentGame);
    }

    this.currentGameStore.setPosition(geolocationStore!.position!);
  }

  render() {
    const {className} = this.props;

    return (
      <Provider 
        newGameStore={this.newGameStore}
        currentGameStore={this.currentGameStore}
      >
        <div className={cx('game-container', className)}>
          <Switch>
            <Route 
              path='/games'
              exact
              render={() => (
                <GamesList className={cx('game-menu')}/>
              )}
            />        
            <Route 
              path='/games/new'
              render={() => (
                <NewGame className={cx('game-menu')}/>
              )}
            />
            <Route 
              path='/games/:id'
              render={() => (
                <CurrentGame className={cx('game-menu')}/>
              )}
            />
          </Switch>
          <GamesMap className={cx('game-map')} >          
            <Switch>  
              <Route 
                path='/games/new'
                component={NewGameMap}
              />
              <Route 
                path='/games/:id'
                component={CurrentGameMap}
              />
            </Switch>
          </GamesMap>
        </div>
      </Provider>
    )
  }
}