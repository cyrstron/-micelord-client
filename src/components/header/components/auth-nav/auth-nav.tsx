import React, {Component} from 'react';
import classNames from 'classnames/bind';

import styles from './auth-nav.scss';
import { UserInfo } from './components/user-info';
import { AuthNavItem } from './components/auth-nav-item/auth-nav-item';

const cx = classNames.bind(styles);

export interface AuthNavProps {
  isAuthenticated: boolean;
  needValidation: boolean;
  isPending: boolean;
  validateToken: () => Promise<void>;
  className?: string;
}

export class AuthNav extends Component<AuthNavProps> {
  componentDidMount() {
    const {
      needValidation,
      validateToken,
    } = this.props;

    if (!needValidation) return;

    validateToken();
  }

  render() {
    const {
      isAuthenticated, 
      isPending, 
      className,
    } = this.props;

    return (
      <div className={cx('auth-nav', className)}>
        {isPending && (
          'Loading...'
        )}
        {isAuthenticated && (
          <UserInfo />
        )}
        {!isAuthenticated && (
          <ul className={cx('auth-nav-list')}>
            <AuthNavItem to='/sign-up'>
              Sign Up
            </AuthNavItem>
            <AuthNavItem to='/sign-in'>
              Sign In
            </AuthNavItem>
          </ul>
        )}
      </div>
    );
  }
}
