import React, { Component } from 'react';
import classnames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './games-list.scss';

const cx = classnames.bind(styles);

export interface GamesListProps {
  className?: string;
}

export class GamesList extends Component<GamesListProps> {
  render() {
    const {className} = this.props;

    return (
      <div className={cx(className)}>
        Choose a game or {(
          <Link to='/games/new'>
            Create you own!
          </Link>
        )}
      </div>
    );
  }
}