import React from 'react';
import classNames from 'classnames/bind';

import styles from './auth-nav.scss';
import { Link } from 'react-router-dom';
import { UserInfo } from './components/user-info';

const cx = classNames.bind(styles);

export interface AuthInfoProps {
  authToken?: string;
  className?: string;
}

export const AuthNavComponent = ({authToken, className}: AuthInfoProps) => (
  <div className={cx(classNames)}>
    {authToken && (
      <UserInfo />
    )}
    {!authToken && (
      <>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>
    )}
  </div>
);
