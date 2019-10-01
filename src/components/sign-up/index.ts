import {SignUpForm} from './sign-up-form';
import {connect} from 'react-redux';
import { createSignUp } from '@state/reducers/auth/auth-operations';
import { Dispatch } from 'redux';
import { getError, getIsPending } from '@state/reducers/auth/auth-selectors';
import { AppState } from '@state/index';
import { withRouter } from 'react-router';

const mapStateToProps = (state: AppState) => ({
  error: getError(state),
  isLoading: getIsPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: createSignUp(dispatch)
});

export const SignUp = withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(SignUpForm)
);

