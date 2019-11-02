import {connect} from 'react-redux';
import { UserInfoComponent } from './user-info';
import { AppState } from '@state/index';
import { getAuthToken, getCurrentUser, getCurrentUserPending, getCurrentUserError } from '@state/reducers/auth/auth-selectors';
import { createSignOut, createGetCurrentUser } from '@state/reducers/auth/auth-operations';
import { Dispatch } from 'redux';

const mapStateToProps = (state: AppState) => ({
  authToken: getAuthToken(state),
  currentUser: getCurrentUser(state),
  error: getCurrentUserError(state),
  isPending: getCurrentUserPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: createSignOut(dispatch),
  getCurrentUser: createGetCurrentUser(dispatch),
});

export const UserInfo = connect(
  mapStateToProps, 
  mapDispatchToProps
)(UserInfoComponent);