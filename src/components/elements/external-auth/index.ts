import { AppState } from '@state/index';
import { selectIsAuthenticated, selectAuthError } from '@state/reducers/auth/auth-selectors';
import { Dispatch } from 'redux';
import { signInWithGoogle, signInWithFacebook } from '@state/reducers/auth/auth-operations';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {ExternalAuth as ExternalAuthComponent} from './external-auth';

const mapStateToProps = (state: AppState) => ({
  isSignedIn: selectIsAuthenticated(state),
  authError: selectAuthError(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signInWithGoogle: async (googleToken: string) => {
    await signInWithGoogle(googleToken)(dispatch);
  },
  signInWithFacebook: async (
    email: string,
    facebookToken: string,
  ) => {
    await signInWithFacebook(email, facebookToken)(dispatch);
  },
})

const ExternalAuth = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ExternalAuthComponent)
);

export {ExternalAuth};