import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  condition: boolean;
  redirectTo: string;
};

export const ProtectedRoute = ({
  condition,
  redirectTo,
  ...props
}: ProtectedRouteProps) => condition ? (
  <Route {...props} />
) : (
  <Redirect to={redirectTo} />
);
