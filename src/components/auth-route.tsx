import React from 'react';
import {connect} from 'react-redux';
import {RouteProps} from 'react-router-dom';
import { AppState } from 'state';
import { getAuthToken } from 'state/auth/auth-selectors';
import { ProtectedRoute } from './protected-route';

export interface AuthRouteProps extends RouteProps {
  isAuthorized: boolean;
};

const AuthRouteComponent = ({
  isAuthorized,
  ...props
}: AuthRouteProps) => (
  <ProtectedRoute
    condition={isAuthorized}
    redirectTo={'/sign-up'}
    {...props}
  />
);

const mapStateToProps = (state: AppState) => ({
  isAuthorized: !!getAuthToken(state),
})

export const AuthRoute = connect(mapStateToProps)(AuthRouteComponent);