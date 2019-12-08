import {connect} from 'react-redux';
import { UserInfoComponent } from './user-info';
import { AppState } from '@state/index';
import { 
  selectAuthToken, 
  selectCurrentUser, 
  selectCurrentUserPending, 
  selectCurrentUserError 
} from '@state/reducers/auth/auth-selectors';
import { signOut, getCurrentUser } from '@state/reducers/auth/auth-operations';

const mapStateToProps = (state: AppState) => ({
  authToken: selectAuthToken(state),
  currentUser: selectCurrentUser(state),
  error: selectCurrentUserError(state),
  isPending: selectCurrentUserPending(state),
});

export const UserInfo = connect(
  mapStateToProps, 
  {
    signOut,
    getCurrentUser
  }
)(UserInfoComponent);