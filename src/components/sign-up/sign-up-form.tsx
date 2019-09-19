import React, {Component, ChangeEvent, FormEvent} from "react";
import { SignUpPayload } from "state/auth/auth-operations";

interface SignUpProps {
  onSubmit: (userPayload: SignUpPayload)=> Promise<void>;
  error?: Error;
  isLoading: boolean; 
}

interface SignUpState extends SignUpPayload {
}

export class SignUpForm extends Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
    }
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {onSubmit} = this.props;

    await onSubmit(this.state);
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();

    this.setState({      
      email: '',
      name: '',
      password: '',
    });
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;

    switch(name) {
      case 'email': 
        this.setState({email: value});
        break;
      case 'name': 
        this.setState({name: value});
        break;
      case 'password': 
        this.setState({password: value});
        break;
    }
  }

  render() {
    const {
      email,
      name,
      password,
    } = this.state;

    const {
      isLoading,
      error,
    } = this.props;

    return (
      <>
        <h2>Sign up</h2>
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
            <label htmlFor="name">Name:</label>
            <input 
              id="name" 
              name="name"
              value={name}
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
      </>
    );
  }
}
