import React, { Component } from 'react';
import classnames from 'classnames/bind';
import navItems from './nav-items.json';
import { NavItem } from './components/nav-item';

import styles from './nav-menu.scss';
import { RouteComponentProps } from 'react-router';

const cx = classnames.bind(styles);

export interface NavMenuProps {
  className?: string;
}

export class NavMenu extends Component<NavMenuProps> {
  render() {
    const {className} = this.props;

    return (
      <nav className={cx('nav-menu', className)}>
        <ul className={cx('nav-list')}>
          {navItems.map(({title, ...props}) => (
            <NavItem
              key={props.to}
              className={cx('nav-item')}
              {...props} 
            >
              {title}
            </NavItem>
          ))}
        </ul>
      </nav>
    )
  }
}