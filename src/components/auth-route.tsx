import React, { ComponentType } from 'react';
import {connect} from 'react-redux';
import {RouteProps} from 'react-router-dom';
import { AppState } from 'state';
import { getAuthToken } from 'state/auth/auth-selectors';
import { ProtectedRoute } from './protected-route';
import {withRouter} from 'react-router';
import { SignUpProps } from './sign-up/sign-up-form';

export interface AuthRouteProps extends RouteProps {
  isAuthorized: boolean;
};

const AuthRouteComponent = ({
  isAuthorized,
  ...props
}: AuthRouteProps) => (
  <ProtectedRoute
    condition={isAuthorized}
    redirectTo='/sign-in'
    {...props}
  />
);

const mapStateToProps = (state: AppState) => ({
  isAuthorized: !!getAuthToken(state),
});

export const AuthRoute = connect(mapStateToProps)(AuthRouteComponent);