import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { NavLink } from '../../../../components/nav-link';

import styles from './auth-nav-item.scss';

const cx = classnames.bind(styles);

export interface AuthNavItemProps {
  className?: string;
  to: string;
}

export class AuthNavItem extends Component<AuthNavItemProps> {
  render() {
    const {
      className,
      to,
      children,
    } = this.props;

    return (
      <li className={cx('auth-nav-item', className)}>
        <NavLink
          to={to}
          className={cx('auth-nav-link')}
        >
          {children}
        </NavLink>
      </li>
    )
  }
}