import React from 'react';
import classnames from 'classnames/bind';

import styles from './input-error.scss';

const cx = classnames.bind(styles);

export interface InputErrorProps {
  className?: string;
  error?: Error;
}

const InputError = ({
  error,
  className
}: InputErrorProps) => !error ? null : (
  <span 
    className={cx('error', className)}
  >
    {error.message}
  </span>
);

export {InputError};
