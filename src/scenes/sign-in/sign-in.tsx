import React, {Component} from "react";
import { Link } from "react-router-dom";
import classnames from 'classnames/bind';

import {ExternalAuth} from '@components/elements/external-auth';
import { SignInForm } from "./components/sign-in-form";

import styles from './sign-in.scss';

const cx = classnames.bind(styles);

export interface SignUpProps {
}

class SignIn extends Component<SignUpProps> {
  render() {
    return (
      <div className={cx('sign-in')}>
        <h2>Sign in</h2>
        <p>
            Don't have an account? <Link to='/sign-up'>Sign up</Link>
        </p>
        <ExternalAuth 
          className={cx('external-auth')} 
        >
          <SignInForm />
        </ExternalAuth>
      </div>
    );
  }
}

export {SignIn};
