import {action, observable, computed} from 'mobx';
import {InputStore} from '@stores/input-store';
import { InputsStore } from '@stores/inputs-store';
import { 
  validateNameRequest, 
  signUpRequest,
  ExternalAuthData,
} from '@state/actions/auth-request/actions';

export class ExternalAuthStore {
  @observable isPending: boolean = false;
  @observable error?: Error;

  authData: ExternalAuthData;

  isSubmitted: boolean = false;

  name: InputStore<string>;
  inputs: InputsStore;

  constructor(authData: ExternalAuthData) {
    this.authData = authData;

    this.name = new InputStore({
      value: '',
      validate: this.validateName
    });

    this.inputs = new InputsStore({
      inputs: [this.name],
    });
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
  } & ExternalAuthData {
    return {
      name: this.name.value,
      ...this.authData,
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