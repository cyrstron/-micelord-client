import React from 'react';
import cx from 'classnames';
import { 
  LinkProps, 
  withRouter, 
  RouteComponentProps,
  matchPath,
  Link
} from 'react-router-dom';

export interface ActiveLinkProps extends LinkProps {
  activeClassName?: string;
  main?: boolean;
  exact?: boolean;
}

const ActiveLinkComponent = ({
  className,
  activeClassName,
  location,
  to,
  children,
  main,
  exact,
}: ActiveLinkProps & RouteComponentProps) => {
  const path = typeof to === 'string' ? to : to.pathname;
  const isActive = !!matchPath(location.pathname, {
    path,
    exact,
  });

  const isDisabled = !!matchPath(location.pathname, {
    path,
    exact: true,
  });

  if (!isDisabled) {
    return (
      <Link 
        to={to} 
        className={cx(className, activeClassName && {
          [activeClassName]: isActive
        })}
      >
        {children}
      </Link>
    );
  }

  return main ? (
    <h1 
      className={cx(className, activeClassName)}
    >
      {children}
    </h1>
  ) : (
    <span 
      className={cx(className, activeClassName)}
    >
      {children}
    </span>
  );
}

export const ActiveLink = withRouter(ActiveLinkComponent);