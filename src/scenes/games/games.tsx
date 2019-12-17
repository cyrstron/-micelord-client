import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import classnames from 'classnames/bind';
import { NewGame } from './scenes/new-game';
import { Game } from './scenes/game';
import { GamesList } from './scenes/games-list';
import { GamesMap } from './scenes/games-map';

import styles from './games.scss';
import { NewGameMap } from './scenes/new-game-map';

const cx = classnames.bind(styles);

export interface GamesProps {
  className?: string;
}

export class Games extends Component<GamesProps> {
  render() {
    const {className} = this.props;

    return (
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
              <Game className={cx('game-menu')}/>
            )}
          />
        </Switch>
        <GamesMap className={cx('game-map')} >          
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
              render={NewGameMap}
            />
            <Route 
              path='/games/:id'
              render={() => (
                <Game className={cx('game-menu')}/>
              )}
            />
          </Switch>
        </GamesMap>
      </div>
    )
  }
}