import {SignUpForm} from './sign-up-form';
import {connect} from 'react-redux';
import { createSignUp } from '@state/reducers/auth/auth-operations';
import { Dispatch } from 'redux';
import { getSignUpError, getSignUpPending } from '@state/reducers/auth/auth-selectors';
import { AppState } from '@state/index';
import { withRouter } from 'react-router';
import { validateEmail, validateName } from '@state/actions/auth-request/actions';

const mapStateToProps = (state: AppState) => ({
  error: getSignUpError(state),
  isLoading: getSignUpPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: createSignUp(dispatch),
  validateEmail: async (email: string) => {
    return dispatch(validateEmail(email));
  },
  validateName: async (name: string) => {
    return dispatch(validateName(name));
  }
});

export const SignUp = withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(SignUpForm)
);

