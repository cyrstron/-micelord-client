import React from 'react';
import classNames from 'classnames/bind';

import styles from './header.scss';
import { AuthNav } from './components/auth-nav';
import { NavMenu } from './components/nav-menu';
import { AppLogo } from './components/app-logo';

const cx = classNames.bind(styles);

export interface HeaderProps {
  className?: string;
  isSignedIn: boolean;
}

const Header = ({isSignedIn ,className}: HeaderProps) => (
  <header className={cx('header', className)}>
    <AppLogo className={cx('app-logo', 'header-item')} />
    {isSignedIn && (
      <NavMenu className={cx('nav-menu', 'header-item')}  />
    )}
    <AuthNav className={cx('auth-nav', 'header-item')}  />
  </header>
);

export {Header};
