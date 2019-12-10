import React, {Component} from "react";
import { Link } from "react-router-dom";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { observable } from "mobx";

import {ExternalAuth} from '../elements/external-auth';
import { SignInForm } from "./components/sign-in-form";

import styles from './sign-in.scss';

const cx = classnames.bind(styles);

export interface SignUpProps {
}

@observer
class SignIn extends Component<SignUpProps> {
  @observable isFormShown: boolean = true;

  hideForm = () => {
    this.isFormShown = false;
  }

  render() {

    return (
      <div className={cx('sign-in')}>
        <h2>Sign in</h2>
        <p>
            Don't have an account? <Link to='/sign-up'>Sign up</Link>
        </p>
        <ExternalAuth 
          className={cx('external-auth')} 
          onAuthToken={this.hideForm}
        />
        {this.isFormShown && (
          <SignInForm />
        )}
      </div>
    );
  }
}

export {SignIn};
