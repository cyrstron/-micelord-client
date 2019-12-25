import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames/bind';

import styles from './icon-button.scss';

const cx = classnames.bind(styles);

export interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const IconButton = ({
  className,
  ...props
}: IconBtnProps) => (
  <button
    className={cx(className, 'btn')}
    {...props}
  />
);

export {IconButton};