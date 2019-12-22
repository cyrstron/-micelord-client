import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames/bind';
import { Input, Textarea, Select, Checkbox } from '@components/inputs';
import { NewGameFormStore } from './stores/new-game-form-store';

import styles from './new-game-form.scss';
import { CancelBtn, SubmitBtn } from '@components/buttons';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { NewGameStore } from '@scenes/games/stores/new-game-store';

const cx = classnames.bind(styles);

interface NewGameFormProps extends RouteComponentProps {
  newGameStore?: NewGameStore;
}

@inject('newGameStore')
@observer
export class NewGameForm extends Component<NewGameFormProps> {
  @observable isApplied: boolean = false;

  newGameFormStore: NewGameFormStore;

  constructor(props: NewGameFormProps) {
    super(props);

    this.newGameFormStore = new NewGameFormStore();
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {history} = this.props;

    history.push('/games/new/border');
  }

  onApply = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    await this.newGameFormStore.inputs.validate();

    if (!this.newGameFormStore.inputs.isValid) return;

    const {
      name,
      desc,
      gridType,
      correction,
      cellSize,
      isHorizontal,
    } = this.newGameFormStore.values;

    const {newGameStore} = this.props;

    newGameStore!.setName(name);
    newGameStore!.setDesc(desc);
    newGameStore!.setGridConfig({
      type: gridType,
      correction,
      cellSize,
      isHorizontal,
    });

    this.isApplied = true;
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();
    
    const {history, newGameStore} = this.props;

    newGameStore!.reset();

    history.push('/games');
  }

  onChange = () => {
    this.isApplied = false;
  }

  render() {
    const {
      name,
      desc,
      correction,
      gridType,
      isHorizontal,
      cellSize,
    } = this.newGameFormStore;

    return (
      <form
        className={cx('new-game-form')}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
      >
        <h3 className={cx('form-title')}>
          Choose proper name and description for your game
        </h3>
        <div className={cx('game-settings')}>
          <Input 
            onChange={this.onChange}
            className={cx('input')}
            id='name'
            title='Game name:'
            inputStore={name} 
          />
          <Textarea 
            id='description'
            onChange={this.onChange}
            className={cx('input', 'description-input')}
            title='Game description:'
            inputStore={desc}
          />
        </div>
        <div className={cx('grid-settings')}>
          <Select 
            onChange={this.onChange}
            id='correction'
            className={cx('input', 'grid-select')}
            title='Correction:'
            inputStore={correction} 
          >
            <option value='merc'>Mercator</option>
            <option value='none'>None</option>
          </Select>
          <Select 
            onChange={this.onChange}
            id='grid-type'
            className={cx('input', 'grid-select')}
            title='Grid type:'
            inputStore={gridType} 
          >
            <option value='hex'>Hexagonal</option>
            <option value='rect'>Rectangular</option>
          </Select>
          <Input 
            onChange={this.onChange}
            className={cx('input', 'cell-size-input')}
            id='cell-size'
            title='Cell size:'
            type='number'
            inputStore={cellSize} 
          />
          <Checkbox 
            onChange={this.onChange}
            id='orientation'
            className={cx('input', 'horizontal-input')}
            title='Horizontal'
            inputStore={isHorizontal}
          />
        </div>
        <div className={cx('btns-wrapper')}>
          <div className={cx('left-btn-wrapper')}>
            <CancelBtn
              type='reset'
            >
              {'<<'} Cancel
            </CancelBtn>
          </div>
          <div className={cx('right-btn-wrapper')}>
            {!this.isApplied && (
              <SubmitBtn 
                onClick={this.onApply}
              >
                Apply
              </SubmitBtn>
            )}
            {this.isApplied && (
              <SubmitBtn type='submit'>
                Next {'>>'}
              </SubmitBtn>
            )}
          </div>
        </div>
      </form>
    )
  }
}