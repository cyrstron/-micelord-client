import React, {Component, ChangeEvent, FormEvent} from "react";
import { SignUpPayload } from "@state/reducers/auth/auth-operations";
import { RouteComponentProps } from "react-router";
import { axios } from "@services/axios";
import debounce from 'lodash/debounce';
import { Link } from "react-router-dom";

export interface SignUpProps extends RouteComponentProps {
  onSubmit: (userPayload: SignUpPayload)=> Promise<any>;
  validateName: (name: string) => Promise<any>;
  validateEmail: (email: string) => Promise<any>;
  error?: Error;
  isLoading: boolean; 
}

interface SignUpState extends SignUpPayload {
  repeatPassword: string;
  emailErrorMsg?: string;
  nameErrorMsg?: string;
  passwordErrorMsg?: string;
  repeatPasswordErrorMsg?: string;
  isEmailValid?: boolean;
  isNameValid?: boolean;
  isEmailPending: boolean;
  isNamePending: boolean;
  isPasswordValid?: boolean;
  isRepeatPasswordValid?: boolean;
}

export class SignUpForm extends Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);

    this.state = {
      emailErrorMsg: undefined,
      nameErrorMsg: undefined,
      passwordErrorMsg: undefined,
      repeatPasswordErrorMsg: undefined,
      isEmailValid: undefined,
      isNameValid: undefined,
      isPasswordValid: undefined,
      isRepeatPasswordValid: undefined,
      isEmailPending: false,
      isNamePending: false,
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
    }
  }

  validateEmail = debounce(async (email: string) => {
    try {
      await this.props.validateEmail(email);
      
      const {email: currentEmail, isEmailValid} = this.state;

      if (currentEmail !== email || isEmailValid) {        
        this.setState({
          isEmailPending: false,
        });
      } else {
        this.setState({
          isEmailValid: true,
          emailErrorMsg: undefined,
          isEmailPending: false,
        });
      };
    } catch (err) {      
      const {email: currentEmail} = this.state;

      if (currentEmail !== email) {   
        this.setState({
          isEmailPending: false,
        });        
      } else {
        this.setState({
          isEmailValid: false,
          emailErrorMsg: err.message,
          isEmailPending: false,
        });
      };
    }
  }, 1000);

  validateName = debounce(async (name: string) => {
    try {
      await this.props.validateName(name);

      const {name: currentName, isNameValid} = this.state;

      if (currentName !== name || isNameValid) {
        this.setState({
          isNamePending: false,
        });        
      } else {
        this.setState({
          isNameValid: true,
          nameErrorMsg: undefined,
          isNamePending: false,
        });
      };
    } catch (err) {
      const {name: currentName} = this.state;

      if (currentName !== name) {
        this.setState({
          isNamePending: false,
        });                
      } else {
        this.setState({
          isNameValid: false,
          nameErrorMsg: err.message,
          isNamePending: false,
        });
      };
    }
  }, 1000);

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {onSubmit} = this.props;
    const {
      email, 
      name, 
      password
    } = this.state;

    await onSubmit({
      email, 
      name, 
      password
    });

    const {error, history} = this.props;

    if (!error) {
      history.push('/sign-in');
    }
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();

    this.setState({    
      emailErrorMsg: undefined,
      nameErrorMsg: undefined,
      passwordErrorMsg: undefined,
      repeatPasswordErrorMsg: undefined,
      isEmailValid: undefined,
      isNameValid: undefined,
      isPasswordValid: undefined,
      isRepeatPasswordValid: undefined,
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
    });
  }

  onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name, validity} = e.target;

    const {password} = this.state;

    switch(name) {
      case 'email': 
        if (validity.valid) {
          this.setState({
            email: value,
            isEmailPending: true,
          });

          await this.validateEmail(value);
        } else {          
          this.setState({
            email: value,
            isEmailValid: false,
            emailErrorMsg: validity.typeMismatch ? 'Email is not valid' : undefined
          });
        } 

        break;
      case 'name': 
        if (validity.valid) {
          this.setState({
            name: value,
            isNamePending: true,
          });

          await this.validateName(value);
        } else {          
          this.setState({
            name: value,
            isNameValid: false,
            nameErrorMsg: validity.tooShort ? 'Name is too short' : undefined
          });
        } 
        this.setState({name: value});
        break;
      case 'password': 
      if (value) {
        this.setState({
          password: value,
          isPasswordValid: true,
          passwordErrorMsg: undefined
        });
      } else {
        this.setState({
          password: value,
          isPasswordValid: false,
          passwordErrorMsg: 'Password is required'
        });
      }
        break;
      case 'repeat-password':
        if (value === password) {
          this.setState({
            repeatPassword: value,
            isRepeatPasswordValid: true,
            repeatPasswordErrorMsg: undefined
          });
        } else {
          this.setState({
            repeatPassword: value,
            isRepeatPasswordValid: false,
            repeatPasswordErrorMsg: 'Passwords don\'t match'
          });
        }
        break;
    }
  }

  render() {
    const {
      email,
      name,
      password,
      repeatPassword,
      isEmailValid,
      isNameValid,
      isRepeatPasswordValid,
      emailErrorMsg,
      nameErrorMsg,
      repeatPasswordErrorMsg,
      isEmailPending,
      isNamePending,
      isPasswordValid,
      passwordErrorMsg
    } = this.state;

    const {
      isLoading,
      error,
    } = this.props;

    const isValid = isEmailValid && isNameValid && isRepeatPasswordValid && isPasswordValid;

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
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              id="email" 
              name="email"
              type="email"
              value={email}
              onChange={this.onChange}
              required
              style={{
                backgroundColor: isEmailPending ? '#aaa' : '#fff',
                borderColor: isEmailValid === undefined ? undefined : 
                  isEmailValid ? '#0f0' : '#f00',
              }}
            />
            {emailErrorMsg && (
              <span>{emailErrorMsg}</span>
            )}
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              id="name" 
              name="name"
              minLength={3}
              value={name}
              onChange={this.onChange}
              required
              style={{
                backgroundColor: isNamePending ? '#aaa' : '#fff',
                borderColor: isNameValid === undefined ? undefined : 
                  isNameValid ? '#0f0' : '#f00',
              }}
            />
            {nameErrorMsg && (
              <span>{nameErrorMsg}</span>
            )}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              id="password" 
              name="password"
              type="password"
              value={password}
              required
              onChange={this.onChange}
              style={{
                borderColor: isPasswordValid === undefined ? undefined : 
                  isPasswordValid ? '#0f0' : '#f00',
              }}
            />
            {passwordErrorMsg && (
              <span>{passwordErrorMsg}</span>
            )}
          </div>
          <div>
            <label htmlFor="repeat-password">Repeat password:</label>
            <input 
              id="repeat-password" 
              name="repeat-password"
              type="password"
              value={repeatPassword}
              onChange={this.onChange}
              required
              style={{
                borderColor: isRepeatPasswordValid === undefined ? undefined : 
                  isRepeatPasswordValid ? '#0f0' : '#f00',
              }}
            />
            {repeatPasswordErrorMsg && (
              <span>{repeatPasswordErrorMsg}</span>
            )}
          </div>
          <button type="submit" disabled={!isValid}>Submit</button>
          <button type="reset">Cancel</button>
        </form>
      </>
    );
  }
}
