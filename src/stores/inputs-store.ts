import { observable, computed, action } from "mobx";

export interface FormField<Value = any> {
  validate: () => Promise<void>;
  value: Value;
  isValid?: boolean;
  isPending: boolean;
  debouncePromise?: Promise<void>;
  reset: () => void;
}

interface InputsStoreProps {
  inputs: FormField[];
  validate?: (inputs: FormField[]) => void | Promise<void>;
}

export class InputsStore {
  inputs: FormField[] = [];

  @observable error?: Error;
  @observable isPending: boolean = false;

  validateInputs?: (inputs: FormField[]) => void | Promise<void>;

  constructor({
    inputs,
    validate
  }: InputsStoreProps) {
    this.inputs = inputs;
    this.validateInputs = validate;
  }

  @computed 
  get isValid() {
    return !this.error && this.inputs.reduce(
      (isValid, input) => isValid && input.isValid !== false && !input.isPending, 
      true
    );
  }

  setInputs(inputs: FormField[]) {
    this.inputs = inputs;
  }

  @action
  async validate() {
    let error: Error | undefined;

    await Promise.all(
      this.inputs
        .filter(({isValid, debouncePromise}) => isValid === undefined || !!debouncePromise)
        .map((input) => input.debouncePromise || input.validate())
    );

    if (!this.validateInputs) return;

    try {
      const validationPromise = this.validateInputs(this.inputs);

      if (!(validationPromise instanceof Promise)) return;

      this.isPending = true;
  
      await validationPromise;
    } catch (err) {
      error = err;
    } finally {
      if (this.isPending) {
        this.isPending = false;
      }

      this.error = error;
    }
  }

  reset() {
    this.inputs.forEach((input) => input.reset());
  }

  refresh() {
    this.error = undefined;
    this.isPending = false;
  }

  [Symbol.iterator]() {
    const {inputs} = this;

    let currentIndex = 0;

    return {
      next() {
        if (currentIndex < inputs.length) {
          return {
            done: false,
            value: inputs[currentIndex++]
          };
        } else {
          return {
            done: true
          };
        }
      }
    }
  }
}