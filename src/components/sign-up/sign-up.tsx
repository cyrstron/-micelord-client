import React, {Component, FormEvent} from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { observable } from "mobx";

import {ExternalAuth} from '../elements/external-auth';

import { SignUpForm } from "./components/sign-up-form";

import styles from './sign-up.scss';

const cx = classnames.bind(styles);

export interface SignUpProps extends RouteComponentProps {
}

@observer
class SignUp extends Component<SignUpProps> {
  onGoogleAuth = (googleToken: string) => {
    console.log(googleToken);
  }

  render() {

    return (
      <div className={cx('sign-up')}>
        <h2>Sign up</h2>
        <p>
          Already have an account? <Link to='/sign-in'>Sign in</Link>
        </p>
        <ExternalAuth 
          className={cx('external-auth')} 
          onGoogleAuth={this.onGoogleAuth}
        />
        <SignUpForm />
      </div>
    );
  }
}

export {SignUp};
