import React, {Component, FormEvent} from "react";
import { SignInPayload } from "@state/reducers/auth/auth-operations";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import { SignInStore } from "./stores/sign-in-store";
import { Link } from "react-router-dom";
import { Input } from "@components/elements/inputs/input";

export interface SignInProps extends RouteComponentProps {
  signIn: (userPayload: SignInPayload)=> Promise<void>;
  error?: Error;
  isPending: boolean; 
}

@observer
class SignInForm extends Component<SignInProps> {
  signInStore: SignInStore;

  constructor(props: SignInProps) {
    super(props);

    this.signInStore = new SignInStore();
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      signIn
    } = this.props;

    const {
      isTouched,
      isValid,
      inputs,
      values,
    } = this.signInStore;

    if (!isTouched) {
      await inputs.validate();
    }

    if (!isValid) return;

    await signIn(values);

    if (this.props.error) return;

    this.props.history.push('/');
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();

    this.signInStore.reset();
  }

  render() {
    const {
      isValid,
      email,
      password,
    } = this.signInStore;

    const {
      isPending,
      error,
    } = this.props;

    return (
      <>
        <h2>Sign in</h2>
        <p>
          Don't have an account? <Link to='/sign-up'>Sign up</Link>
        </p>
        {isPending && 'Loading...'}
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
            title='Password:'
            inputStore={password}
            id='signup-password-field'
          /> 
          <button type="submit" disabled={!isValid}>Submit</button>
          <button type="reset">Cancel</button>
        </form>
      </>
    );
  }
}

export {SignInForm};
