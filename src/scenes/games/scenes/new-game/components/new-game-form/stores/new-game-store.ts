import { InputStore } from "@stores/input-store";
import { InputsStore } from "@stores/inputs-store";

interface NewGameStoreProps {
  name?: string;
  desc?: string;
}

export class NewGameStore {
  name: InputStore;
  desc: InputStore;

  inputs: InputsStore;

  validateName = (value: string) => {
    if (!value) throw new Error('Game name is required field');
    if (value.length > 50) throw new Error('Game name shouldn\'t be bigger than 50 characters');
  }

  validateDesc = (value: string) => {
    if (value.length > 200) throw new Error('Game description shouldn\'t be bigger than 200 characters');
  }

  constructor({
    name = '',
    desc = '',
  }: NewGameStoreProps = {}) {
    this.name = new InputStore({
      value: name,
      validate: this.validateName,
    });    
    this.desc = new InputStore({
      value: desc,
      validate: this.validateDesc
    });

    this.inputs = new InputsStore([
      this.name,
      this.desc
    ]);
  }
}