import React from 'react';
import classNames from 'classnames/bind';

import styles from './header.scss';
import { AuthNav } from './components/auth-nav';

const cx = classNames.bind(styles);

export interface HeaderProps {
  className?: string;
}

export const Header = ({className}: HeaderProps) => (
  <header className={cx('header', className)}>
    <AuthNav />
  </header>
)