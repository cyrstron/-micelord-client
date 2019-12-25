import React, {Component, FormEvent} from "react";
import { RouteComponentProps } from "react-router";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { Input } from "@components/inputs/components/input/input";

import { ExternalAuthStore } from "./stores/external-auth-store";
import { ExternalAuthData } from "@state/actions/auth-request/actions";
import { SubmitBtn, CancelBtn } from "@components/buttons";

import styles from './external-auth-form.scss';

const cx = classnames.bind(styles);

interface ExternalAuthFormProps extends RouteComponentProps {
  signIn: (authData: ExternalAuthData) => Promise<void>;
  signInError?: Error;
  isSignedIn: boolean;
  isAuthPending: boolean;
  authData: ExternalAuthData;
}

@observer
class ExternalAuthForm extends Component<ExternalAuthFormProps> {
  extrenalAuthStore: ExternalAuthStore;

  constructor(props: ExternalAuthFormProps) {
    super(props);

    this.extrenalAuthStore = new ExternalAuthStore(props.authData);
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await this.extrenalAuthStore.submit();

    if (!this.extrenalAuthStore.isSubmitted) return;

    const {authData, signIn} = this.props;

    await signIn(authData);

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
