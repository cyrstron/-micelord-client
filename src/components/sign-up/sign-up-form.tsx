import React, {Component, FormEvent} from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { SignUpStore } from "./stores/sign-up-store";
import { Input } from "@components/elements/inputs/input";
import { observer } from "mobx-react";

export interface SignUpProps extends RouteComponentProps {
}

@observer
class SignUpForm extends Component<SignUpProps> {
  signUpStore: SignUpStore;

  constructor(props: SignUpProps) {
    super(props);

    this.signUpStore = new SignUpStore();
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await this.signUpStore.submit();

    if (!this.signUpStore.isSubmitted) return;

    this.props.history.push('/sign-in');
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();

    this.signUpStore.reset();
  }

  render() {
    const {
      isValid,
      error,
      isPending,
      email,
      name,
      password,
      passwordConfirm,
    } = this.signUpStore;

    return (
      <>
        <h2>Sign up</h2>
        <p>
          Already have an account? <Link to='/sign-in'>Sign in</Link>
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
