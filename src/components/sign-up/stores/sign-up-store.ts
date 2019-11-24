import {action, observable, computed} from 'mobx';
import {InputStore} from '@stores/input-store';
import { InputsStore } from '@stores/inputs-store';
import { SignUpPayload } from '@state/reducers/auth/auth-operations';
import { Dispatch } from 'redux';
import {emailValidationRegex} from '../../../consts';
import { validateEmail, validateName } from '@state/actions/auth-request/actions';

interface SignUpStoreProps {
  dispatch: Dispatch;
}

export class SignUpStore {
  email: InputStore<string>;
  name: InputStore<string>;
  password: InputStore<string>;
  passwordConfirm: InputStore<string>;

  inputs: InputsStore;
  dispatch: Dispatch;

  constructor({
    dispatch,
  }: SignUpStoreProps) {
    this.dispatch = dispatch;

    this.email = new InputStore({
      value: '',
      validate: this.validateEmail
    });
    this.name = new InputStore({
      value: '',
      validate: this.validateName
    });
    this.password = new InputStore({
      value: '',
      validate: this.validatePassword
    });
    this.passwordConfirm = new InputStore({
      value: '',
      validate: this.validatePasswordConfirm
    });

    this.inputs = new InputsStore([
      this.email,
      this.name,
      this.password,
      this.passwordConfirm,
    ]);
  }

  validateEmail = async (value: string) => {
    if (!value) throw Error('Email is required field');

    if (!emailValidationRegex.test(value)) throw Error('Email is required field');

    await this.dispatch(validateEmail(value));    
  }

  validateName = async (value: string) => {
    if (!value) throw Error('Name is required field');

    if (value.length < 3) throw Error('Name should have at least 3 characters');

    await this.dispatch(validateName(value));    
  }

  validatePassword = (value: string) => {
    if (!value) throw Error('Password is required field');

    if (value.length) throw Error('Password should have at least 3 characters');
  }

  validatePasswordConfirm = (value: string) => {
    if (!value) throw Error('Password confirmation is required field');

    if (value !== this.password.value) throw Error('Password confirmation should be equal password field');
  }

  get isValid() {
    return this.inputs.isValid;
  }

  @computed
  get values(): SignUpPayload {
    return {
      email: this.email.value,
      name: this.name.value,
      password: this.password.value,
    }
  }

  setEmail = (value: string) => {
    this.email.setValue(value);
  }

  setName = (value: string) => {
    this.name.setValue(value);
  }

  setPassword = (value: string) => {
    this.password.setValue(value);
  }

  setPasswordConfirm = (value: string) => {
    this.passwordConfirm.setValue(value);
  }

  async validate() {
    await this.inputs.validate();
  }

  @action
  reset = () => {
    this.inputs.reset();
  }
}