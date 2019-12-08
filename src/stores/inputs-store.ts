import { InputStore } from "./input-store";
import { observable, computed } from "mobx";

export class InputsStore {
  @observable inputs: InputStore[] = [];

  constructor(inputs: InputStore[]) {
    this.inputs = inputs;
  }

  @computed 
  get isValid() {
    return this.inputs.reduce(
      (isValid, input) => isValid && input.isValid && !input.isPending, 
      true
    );
  }

  @computed 
  get isTouched() {
    return this.inputs.reduce(
      (isTouched, input) => isTouched && input.isTouched, 
      false
    );
  }

  async validate() {
    await Promise.all(
      this.inputs.map((input) => input.validate())
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