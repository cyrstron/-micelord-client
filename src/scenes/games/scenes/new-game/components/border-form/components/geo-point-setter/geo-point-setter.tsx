import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { GeoPointStore } from '@scenes/games/stores/point-store';
import { Button } from '@components/buttons';

import styles from './geo-point-setter.scss';
import { GeoPointControl } from './components/geo-point-control';
import { GeoPoint } from './components/geo-point';
import { GeoPointPanel } from './components/geo-point-panel/geo-point-panel';

const cx = classnames.bind(styles);

export interface GeoPointSetterProps {
  inputStore: GeoPointStore;
  className?: string;
  onEdit: (pointIndex: number) => void;
  onApply: () => void;
  onDelete: (index: number) => void;
  onChange?: () => void;
  isEditing: boolean;
  index: number;
}

class GeoPointSetter extends Component<GeoPointSetterProps> {
  shouldComponentUpdate({isEditing}: GeoPointSetterProps) {
    return this.props.isEditing || isEditing;
  }

  render() {
    const {
      inputStore,
      index,
      className,
      onChange,
      onApply,
      onEdit,
      onDelete,
      isEditing,
    } = this.props;

    const {value, isValid} = inputStore;

    return (
      <div 
        className={cx('geo-point-setter', className, {
          'is-editing': isEditing,
        })}
      >
        {isEditing && (
          <GeoPointControl 
            inputStore={inputStore}
            className={cx('point')}
            onChange={onChange}
            onApply={onApply}
            index={index}
          />
        )}
        {!isEditing && (
          <GeoPoint 
            className={cx('point')}
            point={value}
            index={index}
            isValid={isValid}
            onEdit={onEdit}
          />
        )}
        <GeoPointPanel 
          className={cx('panel')}
          index={index}
          isEditing={isEditing}
          onApply={onApply}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    )
  }
}

export {GeoPointSetter};