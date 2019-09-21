import {connect} from 'react-redux';
import { UserInfoComponent } from './user-info';
import { AppState } from '@state/index';
import { getAuthToken } from '@state/auth/auth-selectors';
import { createSignOut } from '@state/auth/auth-operations';
import { Dispatch } from 'redux';

const mapStateToProps = (state: AppState) => ({
  authToken: getAuthToken(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: createSignOut(dispatch),
});

export const UserInfo = connect(
  mapStateToProps, 
  mapDispatchToProps
)(UserInfoComponent);