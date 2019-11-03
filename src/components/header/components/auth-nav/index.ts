import {connect} from 'react-redux';
import { AuthNavComponent } from './auth-nav';
import { AppState } from '@state/index';
import { getIsAuthenticated, getNeedTokenValidation, getValidateTokenPending } from '@state/reducers/auth/auth-selectors';
import { createValidateToken } from '@state/reducers/auth/auth-operations';
import { Dispatch } from 'redux';

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: getIsAuthenticated(state),
  needValidation: getNeedTokenValidation(state),
  isPending: getValidateTokenPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  validateToken: createValidateToken(dispatch),
});

export const AuthNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthNavComponent);