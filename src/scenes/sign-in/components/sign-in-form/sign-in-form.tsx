import React, {Component, FormEvent} from "react";
import { RouteComponentProps } from "react-router";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { SignInStore } from "./stores/sign-in-store";
import { Input } from "@components/inputs";
import { SignInPayload } from "@state/reducers/auth/auth-operations";
import { SubmitBtn, CancelBtn } from "@components/buttons";

import styles from './sign-in-form.scss';

const cx = classnames.bind(styles);

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

    await this.signInStore.validate();

    const {
      isValid,
      values,
    } = this.signInStore;

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
      <div
        className={cx('form')}
      >
        {isPending && 'Loading...'}
        {error && error.message}
        <form 
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        >
          <Input
            className={cx('input')}
            title='Email:'
            inputStore={email}
            id='signup-email-field'
          /> 
          <Input
            className={cx('input')}
            title='Password:'
            inputStore={password}
            type='password'
            id='signup-password-field'
          /> 
          <div
            className={cx('btn-wrapper')}
          >
            <SubmitBtn
              className={cx('submit-btn', 'btn')}
              type='submit'
              disabled={!isValid}
            >
              Submit
            </SubmitBtn>
            <CancelBtn
              className={cx('cancel-btn', 'btn')}
              type='reset'
            >
              Cancel
            </CancelBtn>
          </div>
        </form>
      </div>
    );
  }
}

export {SignInForm};
