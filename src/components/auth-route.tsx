import React from 'react';
import {connect} from 'react-redux';
import {RouteProps} from 'react-router-dom';
import { AppState } from 'state';
import { selectAuthToken } from '@state/reducers/auth/auth-selectors';
import { ProtectedRoute } from './protected-route';

export interface AuthRouteProps extends RouteProps {
  isAuthorized: boolean;
};

const AuthRouteComponent = ({
  isAuthorized,
  ...props
}: AuthRouteProps) => (
  <ProtectedRoute
    isAllowed={isAuthorized}
    redirectTo='/sign-in'
    {...props}
  />
);

const mapStateToProps = (state: AppState) => ({
  isAuthorized: !!selectAuthToken(state),
});

const AuthRoute = connect(mapStateToProps)(AuthRouteComponent);

export {AuthRoute};