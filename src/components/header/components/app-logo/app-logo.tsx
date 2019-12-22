import React from 'react';
import classnames from 'classnames/bind';

import styles from './app-logo.scss';
import { ActiveLink } from '@components/elements/links/active-link';

const cx = classnames.bind(styles);

export interface AppLogoProps {
  className?: string;
}

const AppLogo = ({className}: AppLogoProps) => (
  <div className={cx('app-logo', className)}>
    <ActiveLink 
      className={cx('logo-link')}
      activeClassName={cx('is-active')}
      to='/'
      main
      exact
    >
      MouseLord
    </ActiveLink>
  </div>
);

export {AppLogo};
