import React, {Component, FormEvent} from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { observable } from "mobx";

import {ExternalAuth} from '../elements/external-auth';
import { getUserByGoogleToken } from "@state/actions/users-requests/actions";
import { SignInPayload } from "@state/reducers/auth/auth-operations";
import { ExternalSignUp } from "./components/external-auth-form";

import { SignUpForm } from "./components/sign-up-form";

import styles from './sign-up.scss';

const cx = classnames.bind(styles);

export interface SignUpProps extends RouteComponentProps {
  signIn: (user: SignInPayload) => void;
}

@observer
class SignUp extends Component<SignUpProps> {
  @observable googleToken?: string;

  resetGoogleToken = () => {
    this.googleToken = undefined;
  }

  onGoogleAuth = async (googleToken: string) => {
    try {
      const user = await getUserByGoogleToken(googleToken);

      if (user) {
        const {signIn, history} = this.props;

        await signIn({googleToken});

        history.push('/');

        return;
      }
    } catch (err) {
      if (!window.gapi || !window.gapi.auth2) return;

      const auth2 = window.gapi.auth2.getAuthInstance();

      auth2.signOut();
    }

    this.googleToken = googleToken;
  }

  render() {
    const {googleToken} = this;

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
        {!googleToken && (
          <SignUpForm />
        )}
        {googleToken && (
          <ExternalSignUp googleToken={googleToken} />
        )}
      </div>
    );
  }
}

export {SignUp};
