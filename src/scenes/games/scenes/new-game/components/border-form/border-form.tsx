import React, { Component, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import { GeolocationStore } from '@stores/index';
import { CancelBtn, SubmitBtn } from '@components/buttons';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { GeoPointControl } from './components/geo-point-control';
import { MapService } from 'react-google-maps-ts';

import styles from './border-form.scss';

const cx = classnames.bind(styles);

export interface BorderFormProps extends RouteComponentProps {
  newGameStore?: NewGameStore;
}

type Props = BorderFormProps & {
  mapService: MapService
}

@inject('newGameStore')
@observer
export class BorderForm extends Component<Props> {
  @observable isApplied: boolean = false;

  componentDidMount() {
    const {
      newGameStore,
    } = this.props;

    const {newBorderStore} = newGameStore!;

    if (newBorderStore.points.length > 0) return;

    this.addDefaultPoint();
  }

  addDefaultPoint = () => {
    const {
      newGameStore, 
      mapService,
    } = this.props;

    const {newBorderStore} = newGameStore!;

    const center = mapService.getCenter();

    newBorderStore.addPoint(center);
  }

  editPoint = (pointIndex: number) => {
    const {newGameStore} = this.props;

    const {
      newBorderStore
    } = newGameStore!;

    newBorderStore.editPoint(pointIndex);
  }

  applyPoint = () => {
    const {newGameStore} = this.props;

    const {
      newBorderStore
    } = newGameStore!;

    newBorderStore.resetEditing();
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {history} = this.props;

    history.push('/games/new/submit');
  }

  onApply = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const {newGameStore} = this.props;
    const {newBorderStore} = newGameStore!;

    await newBorderStore.onApply();

    if (!newBorderStore.isValid) return;

    this.isApplied = true;
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();
    
    const {history} = this.props;

    history.push('/games/new');
  }

  onChange = () => {
    this.isApplied = false;
  }

  render() {
    const {newGameStore} = this.props;

    const {
      points, 
      editedPointIndex
    } = newGameStore!.newBorderStore;

    return (
      <form
        className={cx('new-game-form')}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
      >
        <h3 className={cx('form-title')}>
          Choose proper game borders
        </h3>
        <div className={cx('points-list')}>
          {points.map((pointStore, index) => (
            <GeoPointControl 
              className={cx('point-control')}
              onChange={this.onChange}
              onEdit={this.editPoint}
              onApply={this.applyPoint}
              isEditing={editedPointIndex === index}
              key={index}
              inputStore={pointStore}
              index={index}
            />
          ))}
          <div>
            <button 
              onClick={this.addDefaultPoint}
              className={cx('add-point-btn')}
              id='add-point-btn'
            >
              +
            </button>
            <label 
              htmlFor='add-point-btn'
              className={cx('add-point-label')}
            >
              Add point
            </label>
          </div>
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