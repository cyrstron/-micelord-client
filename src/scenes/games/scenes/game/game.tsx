import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { RouteComponentProps } from 'react-router-dom';

import styles from './game.scss';

const cx = classnames.bind(styles);

interface GameProps extends RouteComponentProps {
  className?: string;
}

export class Game extends Component<GameProps> {
  render() {
    const {className} = this.props;

    return (
      <div className={cx(className)} >
        game
      </div>
    )
  }
}