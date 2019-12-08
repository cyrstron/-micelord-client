import {observable, action} from 'mobx';
import debounce = require('lodash/debounce');

export type ValidateFunc<Value> = (value: Value) => void | never | Promise<void | never>;

export type InputType = 'text' | 'number' | 'range' | 'checkbox' | 'password' | 'email';

interface InputStoreProps<Value> {
  value: Value;
  defaultValue?: Value;
  validate?: ValidateFunc<Value>;
  relatedInputs?: InputStore[];
  type?: InputType;
}

export class InputStore<Value = string> {
  @observable value: Value;

  @observable isValid?: boolean;
  @observable isTouched: boolean = false;
  @observable isPending: boolean = false;
  @observable error?: Error;
  
  validationCallback?: ValidateFunc<Value>;
  defaultValue?: Value;
  validations: Set<Promise<void | never>> = new Set();

  debouncePromise?: Promise<void>;
  resolveValidation?: () => void;

  relatedInputs: InputStore[] = [];

  constructor({
    value,
    validate,
    defaultValue,
    relatedInputs = [],
  }: InputStoreProps<Value>) {
    this.value = value;
    this.validationCallback = validate;
    this.defaultValue = defaultValue;
    this.relatedInputs = relatedInputs;
  }

  @action
  validateValue = async () => {
    let isValid: boolean = true;
    let error: Error | undefined;
    let validationPromise: Promise<void | never> | undefined;

    try {
      validationPromise = this.validationCallback && 
        this.validationCallback(this.value) as Promise<void> | undefined;

      if (validationPromise instanceof Promise) {
        this.isPending = true;
        this.validations.add(validationPromise);

        await validationPromise;
      }
    } catch (err) {
      error = err;
      isValid = false;
    } finally {
      let isCancelled: boolean = false;

      if (validationPromise) {
        isCancelled = !this.validations.has(validationPromise);

        this.validations.delete(validationPromise);
      }

      if (isCancelled) return;

      this.error = error;
      this.isValid = isValid;
      this.isPending = false;

      this.resolveValidation && this.resolveValidation();

      this.debouncePromise = undefined;
      this.resolveValidation = undefined;
    }
  }

  validateDebounced = debounce(this.validateValue, 500);

  validate() {
    if (!this.isTouched) {
      this.isTouched = true;
    }

    if (!this.debouncePromise) {
      this.debouncePromise = new Promise((res) => {
        this.resolveValidation = res;
      });
    };

    this.validateDebounced();
    
    return this.debouncePromise;
  }

  @action setValue(value: Value) {
    if (!this.isTouched) {
      this.isTouched = true;
    }

    if (this.isPending) {
      this.validations = new Set();

      this.isPending = false;
    }

    this.value = value;

    this.validate();

    this.relatedInputs.forEach((input) => {
      input.isTouched && input.validate();
    })
  }

  @action reset() {
    this.isValid = undefined;
    this.isTouched = false;
    this.isPending = false;
    this.error = undefined;
    this.value = this.defaultValue || '' as unknown as Value;
  }
}