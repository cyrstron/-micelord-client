import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames/bind';
import {Button} from '../button/button';

import styles from './submit-btn.scss';

const cx = classnames.bind(styles);

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const SubmitBtn = ({
  className,
  ...props
}: BtnProps) => (
  <Button
    className={cx(className, 'btn')}
    {...props}
  />
);

export {SubmitBtn};
