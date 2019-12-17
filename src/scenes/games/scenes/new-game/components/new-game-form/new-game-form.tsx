import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames/bind';
import { Input, Textarea, Select, Checkbox } from '@components/inputs';
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
      correction,
      gridType,
      isHorizontal,
    } = this.newGameStore;

    return (
      <form
        onSubmit={this.onSubmit}
        onReset={this.onReset}
      >
        <h3>Choose proper name and description for your game</h3>
        <div>
          <Input 
            className={cx('input')}
            id='name'
            title='Game name:'
            inputStore={name} 
          />
          <Textarea 
            id='description'
            className={cx('input')}
            title='Game description:'
            inputStore={desc} 
            rows={3}
          />
        </div>
        <div>
          <Select 
            id='correction'
            className={cx('input')}
            title='Correction:'
            inputStore={correction} 
          >
            <option value='merc'>Mercator</option>
            <option value='none'>None</option>
          </Select>
          <Select 
            id='grid-type'
            className={cx('input')}
            title='Grid type:'
            inputStore={gridType} 
          >
            <option value='hex'>Hexagonal</option>
            <option value='rect'>Rectangular</option>
          </Select>
          <Checkbox 
            id='orientation'
            className={cx('input')}
            title='Horizontal'
            inputStore={isHorizontal}
          />
        </div>
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