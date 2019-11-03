import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.scss';

const cx = classNames.bind(styles);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isValid: boolean;
}

export const Input = ({
  className,
  isValid,
  ...props
}: InputProps) => (
  <input
    {...props}
    className={cx('input', className, {
      'is-valid': isValid,
    })}
  />
)