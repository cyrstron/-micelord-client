import {action, observable, computed} from 'mobx';
import {InputStore} from '@stores/input-store';
import { InputsStore } from '@stores/inputs-store';
import { 
  validateNameRequest, signUpRequest,
} from '@state/actions/auth-request/actions';
import { SignInPayload } from '@state/reducers/auth/auth-operations';

export class ExternalAuthStore {
  @observable isPending: boolean = false;
  @observable error?: Error;

  googleToken: string;

  isSubmitted: boolean = false;

  name: InputStore<string>;
  inputs: InputsStore;

  constructor(googleToken: string) {
    this.googleToken = googleToken;

    this.name = new InputStore({
      value: '',
      validate: this.validateName
    });

    this.inputs = new InputsStore([
      this.name,
    ]);
  }

  validateName = async (value: string) => {
    if (!value) throw Error('Name is required field');

    if (value.length < 3) throw Error('Name should have at least 3 characters');

    await validateNameRequest(value);    
  }
  get isValid() {
    return this.inputs.isValid;
  }

  @computed
  get values(): {
    name: string,
    googleToken: string,
  } {
    return {
      name: this.name.value,
      googleToken: this.googleToken,
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