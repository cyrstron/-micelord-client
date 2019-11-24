import React, {Component, ChangeEvent, FormEvent} from "react";
import { SignUpPayload } from "@state/reducers/auth/auth-operations";
import { RouteComponentProps } from "react-router";
import debounce from 'lodash/debounce';
import { Link } from "react-router-dom";
import { SignUpStore } from "./stores/sign-up-store";
import {Dispatch} from 'redux';

export interface SignUpProps extends RouteComponentProps {
  onSubmit: (userPayload: SignUpPayload) => Promise<any>;
  dispatch: Dispatch;
  error?: Error;
  isLoading: boolean; 
}

interface SignUpState {
}

export class SignUpForm extends Component<SignUpProps, SignUpState> {
  signUpStore: SignUpStore;

  constructor(props: SignUpProps) {
    super(props);

    const {
      onSubmit,
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

  onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;

    switch(name) {
      case 'email': 
        this.signUpStore.setEmail(value);
        break;
      case 'name': 
        this.signUpStore.setName(value);
        break;
      case 'password': 
        this.signUpStore.setPassword(value);
        break;
      case 'repeat-password':
        this.signUpStore.setPasswordConfirm(value);        
        break;
    }
  }

  render() {
    const {
      isValid,
      reset,
      email: {value: email},
      name: {value: name},
      password: {value: password},
      passwordConfirm: {value: passwordConfirm},
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
