import {observable, action} from 'mobx';
import debounce = require('lodash/debounce');
import { ChangeEvent } from 'react';

export type ValidateFunc<Value> = (value: Value) => void | never | Promise<void | never>;

export type InputType = 'text' | 'number' | 'range' | 'checkbox' | 'password' | 'email';

interface InputStoreProps<Value> {
  value: Value;
  defaultValue?: Value;
  validate?: ValidateFunc<Value>;
  type?: InputType;
}

export class InputStore<Value = string> {
  @observable value: Value;

  @observable isValid: boolean = true;
  @observable isTouched: boolean = false;
  @observable isPending: boolean = false;
  @observable error?: Error;
  
  validationCallback?: ValidateFunc<Value>;
  defaultValue?: Value;
  validations: Set<Promise<void | never>> = new Set();

  constructor({
    value,
    validate,
    defaultValue,
  }: InputStoreProps<Value>) {
    this.value = value;
    this.validationCallback = validate;
    this.defaultValue = defaultValue;
  }

  @action
  async validate() {
    let isValid: boolean = true;
    let error: Error | undefined;
    let validationPromise: Promise<void | never> | undefined;

    if (!this.isTouched) {
      this.isTouched = true;
    }

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
    }
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
  }

  @action reset() {
    this.isValid = true;
    this.isTouched = false;
    this.isPending = false;
    this.value = this.defaultValue || '' as unknown as Value;
  }
}