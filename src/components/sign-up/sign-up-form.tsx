import React, {Component, ChangeEvent, FormEvent} from "react";
import { SignUpPayload } from "@state/reducers/auth/auth-operations";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { SignUpStore } from "./stores/sign-up-store";
import {Dispatch} from 'redux';
import { Input } from "@components/elements/inputs/input";
import { observer } from "mobx-react";

export interface SignUpProps extends RouteComponentProps {
  onSubmit: (userPayload: SignUpPayload) => Promise<any>;
  dispatch: Dispatch;
  error?: Error;
  isLoading: boolean; 
}

interface SignUpState {
}
@observer
class SignUpForm extends Component<SignUpProps, SignUpState> {
  signUpStore: SignUpStore;

  constructor(props: SignUpProps) {
    super(props);

    const {
      dispatch,
    } = props;

    this.signUpStore = new SignUpStore({
      dispatch,
    });
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {onSubmit} = this.props;

    await this.signUpStore.validate();

    const {
      values,
      isValid
    } = this.signUpStore;

    if (!isValid) return;

    await onSubmit(values);

    const {error, history} = this.props;

    if (!error) {
      history.push('/sign-in');
    }
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();

    this.signUpStore.reset();
  }

  render() {
    const {
      isValid,
      email,
      name,
      password,
      passwordConfirm,
    } = this.signUpStore;

    const {
      isLoading,
      error,
    } = this.props;

    return (
      <>
        <h2>Sign up</h2>
        <p>
          Already have an account? <Link to='/sign-in'>Sign in</Link>
        </p>
        {isLoading && 'Loading...'}
        {error && error.message}
        <form 
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        >
          <Input
            title='Email:'
            inputStore={email}
            id='signup-email-field'
          />          
          <Input
            title='Name:'
            inputStore={name}
            id='signup-name-field'
          />        
          <Input
            title='Password:'
            inputStore={password}
            id='signup-password-field'
          />        
          <Input
            title='Confirm password:'
            inputStore={passwordConfirm}
            id='signup-password-confirm-field'
          />
          <button type="submit" disabled={!isValid}>Submit</button>
          <button type="reset">Cancel</button>
        </form>
      </>
    );
  }
}

export {SignUpForm};
