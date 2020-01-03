import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames/bind';

import { CancelBtn, SubmitBtn } from '@components/buttons';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { InputError } from '@components/inputs/components/input-error/input-error';

import styles from './save-game-form.scss';
import { GamePayload } from '@state/actions/games-requests/actions';

const cx = classnames.bind(styles);

interface SaveGameFormProps extends RouteComponentProps {
  newGameStore?: NewGameStore;
  createGame: (game: GamePayload) => Promise<string>;
}

@inject('newGameStore')
@observer
class SaveGameForm extends Component<SaveGameFormProps> {
  @observable isPending: boolean = false;
  @observable error?: Error;

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {history, newGameStore, createGame} = this.props;

    let gameId: string;

    try {
      gameId = await createGame(newGameStore!.gamePayload);
    } catch (err) {
      this.error = err;

      return;
    }

    newGameStore!.reset();

    history.push(`/games/${gameId}`);
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();
    
    const {history} = this.props;

    history.push('/games/border');
  }

  render() {
    const {name, desc} = this.props.newGameStore!;

    return (
      <form
        className={cx('new-game-form')}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
      >
        <h3 className={cx('form-title')}>
          Are you sure?
        </h3>
        <dl>
          <dt>Name:</dt>
          <dd>{name}</dd>
          <dt>Description:</dt>
          <dd>{desc || '-'}</dd>
        </dl>
        {this.error && (
          <InputError
            error={this.error}
          />
        )}
        <div className={cx('btns-wrapper')}>
          <div className={cx('left-btn-wrapper')}>
            <CancelBtn
              disabled={this.isPending}
              type='reset'
            >
              {'<<'} Cancel
            </CancelBtn>
          </div>
          <div className={cx('right-btn-wrapper')}>
            <SubmitBtn 
              type='submit'
              disabled={this.isPending}
            >
              Save
            </SubmitBtn>
          </div>
        </div>
      </form>
    )
  }
}

export {SaveGameForm};