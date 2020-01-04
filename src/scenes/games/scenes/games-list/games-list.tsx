import React, { Component } from 'react';
import classnames from 'classnames/bind';
import {Link} from 'react-router-dom';

import styles from './games-list.scss';
import { Game } from '@state/actions/games-requests/actions';
import { GameItem } from './components/game-item';

const cx = classnames.bind(styles);

export interface GamesListProps {
  className?: string;
  fetchGames: () => Promise<void>;
  games: Game[];
  error?: Error;
  isPending: boolean;
}

export class GamesList extends Component<GamesListProps> {
  componentDidMount() {
    const {fetchGames} = this.props;

    fetchGames();
  }
  
  render() {
    const {
      className,
      isPending,
      error,
      games,
    } = this.props;

    return (
      <div className={cx('games', className)}>
        Choose a game or {(
          <Link to='/games/new'>
            Create you own!
          </Link>
        )}
        {isPending && 'Loading...'}
        {error && error.message}
        {!isPending && !games.length && !error && (
          <div>There's no games currently</div>
        )}
        {!!games.length && (
          <ol className={cx('games-list')}>
            {games.map((game) => (
              <GameItem 
                className={cx('game-item')}
                key={game._id}
                game={game}
              />
            ))}
          </ol>
        )}
      </div>
    );
  }
}