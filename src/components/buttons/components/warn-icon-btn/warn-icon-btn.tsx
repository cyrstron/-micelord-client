import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames/bind';
import {IconButton} from '../icon-button/icon-button';

import styles from './warn-icon-btn.scss';

const cx = classnames.bind(styles);

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const WarnIconBtn = ({
  className,
  ...props
}: BtnProps) => (
  <IconButton
    className={cx(className, 'btn')}
    {...props}
  />
);

export {WarnIconBtn};
