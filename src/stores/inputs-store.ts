import { observable, computed } from "mobx";

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
  @observable inputs: FormField[] = [];

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
    return !this.inputs.reduce(
      (isValid, input) => isValid && input.isValid !== false && !input.isPending, 
      true
    );
  }

  async validate() {
    await Promise.all(
      this.inputs
        .filter(({isValid, debouncePromise}) => isValid === undefined || !!debouncePromise)
        .map((input) => input.debouncePromise || input.validate())
    );

    if (!this.validateInputs) return;

    const validationPromise = this.validateInputs(this.inputs);

    if (!(validationPromise instanceof Promise)) return;

    await validationPromise;
  }

  reset() {
    this.inputs.forEach((input) => input.reset());
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