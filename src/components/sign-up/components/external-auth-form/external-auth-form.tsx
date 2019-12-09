import React, {Component, FormEvent} from "react";
import { RouteComponentProps } from "react-router";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { Input } from "@components/elements/input/input";
import { SignInPayload } from "@state/reducers/auth/auth-operations";

import { ExternalAuthStore } from "./stores/external-auth-store";
import { SubmitBtn } from "@components/elements/buttons/submit-btn/submit-btn";
import { CancelBtn } from "@components/elements/buttons/cancel-btn/cancel-btn";

import styles from './external-auth-form.scss';

const cx = classnames.bind(styles);

export interface ExternalAuthFormProps extends RouteComponentProps {
  signIn: (user: SignInPayload) => void;
  signInError?: Error;
  isSignedIn: boolean;
  googleToken: string;
  isAuthPending: boolean;
}

@observer
class ExternalAuthForm extends Component<ExternalAuthFormProps> {
  extrenalAuthStore: ExternalAuthStore;

  constructor(props: ExternalAuthFormProps) {
    super(props);

    this.extrenalAuthStore = new ExternalAuthStore(props.googleToken);
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await this.extrenalAuthStore.submit();

    if (!this.extrenalAuthStore.isSubmitted) return;

    const {googleToken, signIn} = this.props;

    await signIn({
      googleToken
    });

    const {isSignedIn, history} = this.props;

    if (!isSignedIn) return;

    history.push('/');
  }

  onReset = (e: FormEvent) => {
    e.preventDefault();

    this.extrenalAuthStore.reset();
  }

  render() {
    const {
      isValid,
      error: storeError,
      isPending: isStorePending,
      name,
    } = this.extrenalAuthStore;

    const {
      signInError,
      isAuthPending
    } = this.props;

    const error = signInError || storeError;
    const isPending = isStorePending || isAuthPending;

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
            title='Name:'
            inputStore={name}
            id='signup-name-field'
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

export {ExternalAuthForm};
