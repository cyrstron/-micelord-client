import {SignInForm} from './sign-in-form';
import {connect} from 'react-redux';
import { signIn } from '@state/reducers/auth/auth-operations';
import { 
  selectSignInError, 
  selectSignInPending, 
  selectAuthToken 
} from '@state/reducers/auth/auth-selectors';
import { AppState } from '@state/index';
import { withRouter } from 'react-router';

const mapStateToProps = (state: AppState) => ({
  error: selectSignInError(state),
  authToken: selectAuthToken(state),
  isLoading: selectSignInPending(state),
});

export const SignIn = withRouter(
  connect(
    mapStateToProps, 
    {
      signIn
    }
  )(SignInForm)
);

