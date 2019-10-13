import React, {Component, ChangeEvent, FormEvent} from "react";
import { SignInPayload } from "@state/reducers/auth/auth-operations";
import { RouteComponentProps } from "react-router";
import { GoogleAuth } from "@components/google-auth";

export interface SignInProps extends RouteComponentProps {
  onSubmit: (userPayload: SignInPayload)=> Promise<any>;
  error?: Error;
  isLoading: boolean; 
}

interface SignInState extends SignInPayload {
}

export class SignInForm extends Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {onSubmit} = this.props;

    await onSubmit(this.state);

    const {error, history} = this.props;

    if (!error) {
      history.push('/');
    }
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();

    this.setState({      
      email: '',
      password: '',
    });
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;

    switch(name) {
      case 'email': 
        this.setState({email: value});
        break;
      case 'password': 
        this.setState({password: value});
        break;
    }
  }

  responseGoogle = (res: any) => {
    console.log(res);
  }

  render() {
    const {
      email,
      password,
    } = this.state;

    const {
      isLoading,
      error,
    } = this.props;

    return (
      <>
        <h2>Sign in</h2>
        {isLoading && 'Loading...'}
        {error && error.message}
        <form 
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        >
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              id="email" 
              name="email"
              type="email"
              value={email}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              id="password" 
              name="password"
              type="password"
              value={password}
              onChange={this.onChange}
            />
          </div>
          <button type="submit">Submit</button>
          <button type="reset">Cancel</button>
        </form>
        <GoogleAuth
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </>
    );
  }
}
