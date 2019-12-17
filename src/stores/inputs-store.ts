import { InputStore } from "./input-store";
import { observable, computed } from "mobx";

export class InputsStore {
  @observable inputs: InputStore<any>[] = [];

  constructor(inputs: InputStore<any>[]) {
    this.inputs = inputs;
  }

  @computed 
  get isValid() {
    return this.inputs.reduce(
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