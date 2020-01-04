import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { Game } from '@state/actions/games-requests/actions';
import {Link} from 'react-router-dom';

import styles from './game-item.scss';

const cx = classnames.bind(styles);

export interface GameInfoProps {
  className?: string;
  game: Game;
}

const GameItem = ({
  className, 
  game: {_id, name, createdBy}
}: GameInfoProps) => (
  <li className={cx('game-item', className)}>
    <Link to={`/games/${_id}`}>{name}</Link> by {createdBy.name}
  </li>
);

export {GameItem};