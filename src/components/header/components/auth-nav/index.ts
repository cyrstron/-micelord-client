import {connect} from 'react-redux';
import { AuthNav as AuthNavComponent } from './auth-nav';
import { AppState } from '@state/index';
import { 
  selectIsAuthenticated, 
  selectNeedTokenValidation, 
  selectValidateTokenPending 
} from '@state/reducers/auth/auth-selectors';
import { validateToken } from '@state/reducers/auth/auth-operations';

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: selectIsAuthenticated(state),
  needValidation: selectNeedTokenValidation(state),
  isPending: selectValidateTokenPending(state),
});

export const AuthNav = connect(
  mapStateToProps,
  {
    validateToken
  }
)(AuthNavComponent);