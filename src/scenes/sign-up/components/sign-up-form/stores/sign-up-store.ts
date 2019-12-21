import {action, observable, computed} from 'mobx';
import {InputStore} from '@stores/input-store';
import { InputsStore } from '@stores/inputs-store';
import {emailValidationRegex} from '../../../../../consts';
import { 
  validateEmailRequest, 
  validateNameRequest,
  signUpRequest,
} from '@state/actions/auth-request/actions';

interface SignUpStoreProps {
}

export class SignUpStore {
  @observable isPending: boolean = false;
  @observable error?: Error;

  isSubmitted: boolean = false;

  email: InputStore<string>;
  name: InputStore<string>;
  password: InputStore<string>;
  passwordConfirm: InputStore<string>;

  inputs: InputsStore;

  constructor() {
    this.email = new InputStore({
      value: '',
      validate: this.validateEmail
    });
    this.name = new InputStore({
      value: '',
      validate: this.validateName
    });
    this.passwordConfirm = new InputStore({
      value: '',
      validate: this.validatePasswordConfirm
    });
    this.password = new InputStore({
      value: '',
      validate: this.validatePassword,
      relatedInputs: [
        this.passwordConfirm,
      ]
    });

    this.inputs = new InputsStore({
      inputs: [
        this.email,
        this.name,
        this.password,
        this.passwordConfirm,
      ],
    });
  }

  validateEmail = async (value: string) => {
    if (!value) throw Error('Email is required field');

    if (!emailValidationRegex.test(value)) throw Error('Email is not valid');

    await validateEmailRequest(value);
  }

  validateName = async (value: string) => {
    if (!value) throw Error('Name is required field');

    if (value.length < 3) throw Error('Name should have at least 3 characters');

    await validateNameRequest(value);    
  }

  validatePassword = (value: string) => {
    if (!value) throw Error('Password is required field');

    if (value.length < 3) throw Error('Password should have at least 3 characters');
  }

  validatePasswordConfirm = (value: string) => {
    if (!value) throw Error('Password confirmation is required field');

    if (value !== this.password.value) throw Error('Password confirmation should be equal password field');
  }

  get isValid() {
    return this.inputs.isValid;
  }

  @computed
  get values() {
    return {
      email: this.email.value,
      name: this.name.value,
      password: this.password.value,
    }
  }

  async validate() {
    await this.inputs.validate();
  }

  @action
  reset() {
    this.inputs.reset();
  }

  @action 
  async submit() {
    if (this.error) {
      this.error = undefined;
    }
    
    this.isPending = true;

    await this.validate();

    try {
      if (this.isValid) {
        await signUpRequest(this.values);

        this.isSubmitted = true;
      };
    } catch (err) {
      this.error = err;
    } finally {
      this.isPending = false;
    }
  }
}