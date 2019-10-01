import {SignInForm} from './sign-in-form';
import {connect} from 'react-redux';
import { createSignIn } from '@state/reducers/auth/auth-operations';
import { Dispatch } from 'redux';
import { getError, getIsPending, getAuthToken } from '@state/reducers/auth/auth-selectors';
import { AppState } from '@state/index';
import { withRouter } from 'react-router';

const mapStateToProps = (state: AppState) => ({
  error: getError(state),
  authToken: getAuthToken(state),
  isLoading: getIsPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: createSignIn(dispatch)
});

export const SignIn = withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(SignInForm)
);

