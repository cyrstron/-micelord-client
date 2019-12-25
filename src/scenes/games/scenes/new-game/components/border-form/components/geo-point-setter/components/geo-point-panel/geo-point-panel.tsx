import React, { Component, MouseEvent } from 'react';
import classnames from 'classnames/bind';

import styles from './geo-point-panel.scss';
import { DangerIconBtn } from '@components/buttons/components/danger-icon-btn/danger-icon-btn';
import { SubmitIconBtn } from '@components/buttons/components/submit-icon-btn/submit-icon-btn';
import { WarnIconBtn } from '@components/buttons/components/warn-icon-btn/warn-icon-btn';

const cx = classnames.bind(styles);

export interface GeoPointPanelProps {
  onEdit: (pointIndex: number) => void;
  onApply: () => void;
  onDelete: (index: number) => void;
  className?: string;
  isEditing: boolean;
  index: number;
}

class GeoPointPanel extends Component<GeoPointPanelProps> {
  onDelete = (e: MouseEvent) => {
    e.preventDefault();

    const {onDelete, index} = this.props;

    onDelete(index);
  }

  onEdit = (e: MouseEvent) => {
    e.preventDefault();

    const {onEdit, index} = this.props;

    onEdit(index);
  }

  onApply = (e: MouseEvent) => {
    e.preventDefault();

    const {onApply} = this.props;

    onApply();
  }

  render() {
    const {
      isEditing,
      className,
    } = this.props;

    return (
      <div className={cx('geo-point-control', className)}>
        {isEditing ? (
          <SubmitIconBtn
            className={cx('btn')}
            onClick={this.onApply}
          >
            ✔
          </SubmitIconBtn>
        ) : (
          <WarnIconBtn
            className={cx('btn')}
            onClick={this.onEdit}
          >
            ✎
          </WarnIconBtn>
        )}
        <DangerIconBtn 
          className={cx('btn')}
          onClick={this.onDelete}
        >
          ✘
        </DangerIconBtn>
      </div>
    )
  }
}

export {GeoPointPanel};