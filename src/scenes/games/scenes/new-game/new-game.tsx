import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { Switch, Route } from 'react-router-dom';

import { NewGameForm } from './components/new-game-form';

import styles from './new-game.scss';
import { MapService, MapBroadcaster } from 'react-google-maps-ts';

const cx = classnames.bind(styles);

export interface NewGameProps {
  className?: string;
}

export class NewGame extends Component<NewGameProps> {
  onMapClick = (e: google.maps.MouseEvent) => {
    console.log(e);
  }

  render() {
    const {className} = this.props;

    return (
      <div className={cx('new-game', className)}>
        <Switch>
          <Route 
            path='/games/new' 
            exact 
            component={NewGameForm}
          />
          <Route path='/games/new/grid' />
          <Route path='/games/new/border' />
        </Switch>
        <MapBroadcaster 
          onClick={this.onMapClick}
        />
      </div>
    );
  }
}