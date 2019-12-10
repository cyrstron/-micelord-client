import { AppState } from '@state/index';
import { selectIsAuthenticated } from '@state/reducers/auth/auth-selectors';
import { Dispatch } from 'redux';
import { signInWithGoogle } from '@state/reducers/auth/auth-operations';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {ExternalAuth as ExternalAuthComponent} from './external-auth';

const mapStateToProps = (state: AppState) => ({
  isSignedIn: selectIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signInWithGoogle: async (googleToken: string) => {
    await signInWithGoogle(googleToken)(dispatch);
  }
})

const ExternalAuth = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ExternalAuthComponent)
);

export {ExternalAuth};