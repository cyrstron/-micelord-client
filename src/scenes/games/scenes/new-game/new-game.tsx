import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { Switch, Route } from 'react-router-dom';

import { NewGameForm } from './components/new-game-form';

import styles from './new-game.scss';
import { BorderForm } from './components/border-form';
import { ProtectedRoute } from '@components/protected-route';
import { inject, observer } from 'mobx-react';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { SaveGameForm } from './components/save-game-form';

const cx = classnames.bind(styles);

export interface NewGameProps {
  className?: string;
  newGameStore?: NewGameStore;
}

@inject('newGameStore')
@observer
export class NewGame extends Component<NewGameProps> {
  componentWillUnmount() {
    const {newGameStore} = this.props;

    newGameStore!.reset();
  }
  
  render() {
    const {className, newGameStore} = this.props;

    const {
      gridParams, 
      borderFigure
    } = newGameStore!;

    return (
      <div className={cx('new-game', className)}>
        <Switch>
          <Route 
            path='/games/new' 
            exact 
            component={NewGameForm}
          />
          <ProtectedRoute 
            path='/games/new/border' 
            component={BorderForm}
            redirectTo='/games/new'
            isAllowed={!!gridParams}
          />
          <ProtectedRoute 
            path='/games/new/submit' 
            component={SaveGameForm}
            redirectTo='/games/new/border'
            isAllowed={!!borderFigure}
          />
        </Switch>
      </div>
    );
  }
}