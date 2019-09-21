import {connect} from 'react-redux';
import { AuthNavComponent } from './auth-nav';
import { AppState } from '@state/index';
import { getAuthToken } from '@state/auth/auth-selectors';

const mapStateToProps = (state: AppState) => ({
  authToken: getAuthToken(state),
});

export const AuthNav = connect(
  mapStateToProps
)(AuthNavComponent);