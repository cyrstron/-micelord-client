import React from 'react';
import classnames from 'classnames/bind';
import { LinkProps } from 'react-router-dom';
import { ActiveLink } from '@components/elements/links';

import styles from './nav-link.scss';

const cx = classnames.bind(styles);

interface NavLinkProps extends LinkProps {
  className?: string;
  exact?: boolean;
}

const NavLink = ({className, ...props}: NavLinkProps) => (
  <ActiveLink
    className={cx(className, 'nav-link')}
    activeClassName={cx('is-active')}
    {...props}
  />
);

export {NavLink};
