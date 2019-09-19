import {SignUpForm} from './sign-up-form';
import {connect} from 'react-redux';
import { createSignUp } from '@state/auth/auth-operations';
import { Dispatch } from 'redux';
import { getError, getIsPending } from '@state/auth/auth-selectors';
import { AppState } from '@state/index';

const mapStateToProps = (state: AppState) => ({
  error: getError(state),
  isLoading: getIsPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: createSignUp(dispatch)
});

export const SignUp = connect(
  mapStateToProps, 
  mapDispatchToProps
)(SignUpForm);

