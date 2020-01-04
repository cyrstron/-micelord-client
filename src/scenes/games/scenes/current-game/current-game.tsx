import React, { Component, createRef } from 'react';
import classnames from 'classnames/bind';
import { RouteComponentProps } from 'react-router-dom';
import { Game } from '@state/actions/games-requests/actions';
import { inject, observer } from 'mobx-react';
import { CurrentGameStore } from '@scenes/games/stores/current-game-store';

import styles from './current-game.scss';

const cx = classnames.bind(styles);

interface CurrentGameProps extends RouteComponentProps<{id: string}> {
  className?: string;
  fetchGame: (id: string) => Promise<void>;
  resetGame: () => void;
  error?: Error;
  isPending: boolean;
  game?: Game;
  currentGameStore?: CurrentGameStore;
}

@inject('currentGameStore')
@observer
class CurrentGame extends Component<CurrentGameProps> {
  componentDidMount() {
    const {
      fetchGame,
      match: {params: {id}}
    } = this.props;

    fetchGame(id);
  }

  componentWillUnmount() {
    const {
      resetGame,
    } = this.props;

    resetGame();
  }

  render() {
    const {
      className,
      isPending,
      error,
      game,
      currentGameStore,
    } = this.props;

    const {selectedObject} = currentGameStore!;

    return (
      <div className={cx(className)} >
        {game && (
          <div>
            {game.name} by {game.createdBy.name}
          </div>
        )}
        {isPending && 'Loading...'}
        {error && error.message}
        {selectedObject && (
          <div>
            {'{'}
            i: {selectedObject.center.i}, j: {selectedObject.center.j}, k: {selectedObject.center.k}
            {'}'}
          </div>
        )}
      </div>
    )
  }
}

export {CurrentGame}