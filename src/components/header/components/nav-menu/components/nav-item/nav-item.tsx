import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { NavLink } from '../../../../components/nav-link';

import styles from './nav-item.scss';

const cx = classnames.bind(styles);

export interface NavItemProps {
  className?: string;
  exact?: boolean;
  to: string;
}

export class NavItem extends Component<NavItemProps> {
  render() {
    const {
      className,
      to,
      children,
      exact,
    } = this.props;

    return (
      <li className={cx('nav-item', className)}>
        <NavLink
          to={to}
          className={cx('nav-link')}
          exact={exact}
        >
          {children}
        </NavLink>
      </li>
    )
  }
}