import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames/bind';

import styles from './button.scss';

const cx = classnames.bind(styles);

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({
  className,
  ...props
}: BtnProps) => (
  <button
    className={cx(className, 'btn')}
    {...props}
  />
);

export {Button};