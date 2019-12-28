import React, { Component, FormEvent, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames/bind';
import { inject, observer } from 'mobx-react';

import { CancelBtn, SubmitBtn, IconButton, SubmitIconBtn } from '@components/buttons';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { GeoPointSetter } from './components/geo-point-setter';
import { MapService } from 'react-google-maps-ts';

import { InputError } from '@components/inputs/components/input-error/input-error';
import { observable } from 'mobx';
import { BorderInfoPopup } from './components/border-info-popup/border-info-popup';

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
  @observable isCollapsed = true;
  @observable isInfoShown = false;

  componentDidMount() {
    const {
      newGameStore,
    } = this.props;

    const {newBorderStore} = newGameStore!;

    if (newBorderStore.points.length > 0) return;

    this.addDefaultPoint();
    newBorderStore.selectPoint(0);
  }

  addDefaultPoint() {
    const {
      newGameStore, 
      mapService,
    } = this.props;

    const {newBorderStore} = newGameStore!;

    const center = mapService.getCenter();

    newBorderStore.addPoint(center);
  }

  deletePoint = (pointIndex: number) => {
    const {newGameStore} = this.props;

    const {
      newBorderStore
    } = newGameStore!;

    newBorderStore.deletePoint(pointIndex);
  }

  editPoint = (pointIndex: number) => {
    const {newGameStore} = this.props;

    const {
      newBorderStore
    } = newGameStore!;

    newBorderStore.selectPoint(pointIndex);
  }

  applyPoint = () => {
    const {newGameStore} = this.props;

    const {
      newBorderStore
    } = newGameStore!;

    newBorderStore.resetSelection();
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {history} = this.props;

    history.push('/games/new/submit');
  }

  onApply = async (e: React.MouseEvent) => {
    e.preventDefault();

    const {newBorderStore} = this.props.newGameStore!;

    await newBorderStore.onApply();
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();
    
    const {history} = this.props;

    history.push('/games/new');
  }

  onChange = () => {
    const {newBorderStore} = this.props.newGameStore!;

    newBorderStore.onReset();
  }

  onAddPoint = (e: MouseEvent) => {
    e.preventDefault();

    this.addDefaultPoint();
  }

  onToggleForm = (e: MouseEvent) => {
    e.preventDefault();

    this.isCollapsed = !this.isCollapsed;
  }

  onToggleInfo = (e: MouseEvent) => {
    e.preventDefault();

    this.isInfoShown = !this.isInfoShown;
  }

  onCloseInfo = () => {
    this.isInfoShown = false;
  }

  render() {
    const {newGameStore} = this.props;

    const {
      points, 
      selectedPointIndex,
      isApplied,
      isPending,
      isValid,
      error
    } = newGameStore!.newBorderStore;

    return (
      <form
        className={cx('new-game-form')}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
      >
        <h3 className={cx('form-title')}>
          <IconButton
            onClick={this.onToggleForm}
          >
            {this.isCollapsed ? '⇧' : '⇩'}
          </IconButton>
          Choose proper game borders
          <IconButton
            onClick={this.onToggleInfo}
          >
            i
          </IconButton>
        </h3>
        {!this.isCollapsed && (
          <div className={cx('points-list')}>
            {points.map((pointStore, index) => (
              <GeoPointSetter 
                className={cx('point-control')}
                onChange={this.onChange}
                onEdit={this.editPoint}
                onApply={this.applyPoint}
                onDelete={this.deletePoint}
                isEditing={selectedPointIndex === index}
                key={index}
                inputStore={pointStore}
                index={index}
              />
            ))}
            <div>
              <label 
                htmlFor='add-point-btn'
                className={cx('add-point-label')}
              >
                <SubmitIconBtn 
                  onClick={this.onAddPoint}
                  className={cx('add-point-btn')}
                  id='add-point-btn'
                >
                  +
                </SubmitIconBtn>
                Add point
              </label>
            </div>
          </div>
        )}
        {error && (
          <InputError 
            error={error}
          />
        )}
        {this.isInfoShown && (
          <BorderInfoPopup 
            closePopup={this.onCloseInfo}
            className={cx('popup')}
          />
        )}
        <div className={cx('btns-wrapper')}>
          <div className={cx('left-btn-wrapper')}>
            <CancelBtn
              type='reset'
              disabled={isPending}
            >
              {'<<'} Cancel
            </CancelBtn>
          </div>
          <div className={cx('right-btn-wrapper')}>
            {!isApplied && (
              <SubmitBtn 
                onClick={this.onApply}
                disabled={isPending || !isValid}
              >
                Apply
              </SubmitBtn>
            )}
            {isApplied && (
              <SubmitBtn 
                type='submit'
                disabled={isPending}
              >
                Next {'>>'}
              </SubmitBtn>
            )}
          </div>
        </div>
      </form>
    )
  }
}