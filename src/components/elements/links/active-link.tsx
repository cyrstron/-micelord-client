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
  exact?: boolean;
  activeClassName?: string;
  main?: boolean;
}

const ActiveLinkComponent = ({
  className,
  activeClassName,
  location,
  exact,
  to,
  children,
  main,
}: ActiveLinkProps & RouteComponentProps) => {
  const path = typeof to === 'string' ? to : to.pathname;
  const isActive = !!matchPath(location.pathname, {
    path,
    exact,
  });

  if (!isActive) {
    return (
      <Link 
        to={to} 
        className={className}
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