import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAllowed: boolean;
  redirectTo: string;
};

const ProtectedRoute = ({
  isAllowed,
  redirectTo,
  component,
  ...props
}: ProtectedRouteProps) => isAllowed ? (
  <Route 
    component={component}
    {...props} 
  />
) : (
  <Route 
    {...props} 
    render={
      () => (
        <Redirect to={redirectTo} />
      )
    }
  />
);

export {ProtectedRoute};

