import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames/bind';
import { Input, Textarea } from '@components/inputs';
import { NewGameStore } from './stores/new-game-store';

import styles from './new-game-form.scss';
import { CancelBtn, SubmitBtn } from '@components/buttons';

const cx = classnames.bind(styles);

interface NewGameFormProps extends RouteComponentProps {

}

export class NewGameForm extends Component<NewGameFormProps> {
  newGameStore: NewGameStore;

  constructor(props: NewGameFormProps) {
    super(props);

    this.newGameStore = new NewGameStore();
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await this.newGameStore.inputs.validate();

    if (!this.newGameStore.inputs.isValid) return;

    const {history} = this.props;

    history.push('/games/new/grid');
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();
    
    const {history} = this.props;

    history.push('/games');
  }

  render() {
    const {
      name,
      desc,
    } = this.newGameStore;

    return (
      <form
        onSubmit={this.onSubmit}
        onReset={this.onReset}
      >
        <h3>Choose proper name and description for your game</h3>
        <Input 
          className={cx('input')}
          title='Game name:'
          inputStore={name} 
        />
        <Textarea 
          className={cx('input')}
          title='Game description:'
          inputStore={desc} 
          rows={3}
        />
        <div className={cx('btns-wrapper')}>
          <CancelBtn type='reset'>
            {'<<'} Cancel
          </CancelBtn>
          <SubmitBtn type='submit'>
            Next {'>>'}
          </SubmitBtn>
        </div>
      </form>
    )
  }
}