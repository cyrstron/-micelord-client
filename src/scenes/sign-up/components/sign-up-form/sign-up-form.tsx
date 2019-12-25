import React, {Component, FormEvent} from "react";
import { RouteComponentProps } from "react-router";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { SignUpStore } from "./stores/sign-up-store";
import { Input } from "@components/inputs";

import { SubmitBtn, CancelBtn } from "@components/buttons";

import styles from './sign-up-form.scss';

const cx = classnames.bind(styles);

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
      <div className={cx('form')}>
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
            title='Name:'
            inputStore={name}
            id='signup-name-field'
          />        
          <Input
            className={cx('input')}
            title='Password:'
            inputStore={password}
            type='password'
            id='signup-password-field'
          />        
          <Input
            className={cx('input')}
            title='Confirm password:'
            inputStore={passwordConfirm}
            type='password'
            id='signup-password-confirm-field'
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

export {SignUpForm};
