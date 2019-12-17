import { InputStore } from "@stores/input-store";
import { InputsStore } from "@stores/inputs-store";

interface NewGameStoreProps {
  name?: string;
  desc?: string;
}

export class NewGameStore {
  name: InputStore;
  desc: InputStore;
  correction: InputStore<'merc' | 'none'>;
  isHorizontal: InputStore<boolean>;
  gridType: InputStore<'hex' | 'rect'>;
  cellSize: InputStore<number>;

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
    this.correction = new InputStore<'merc' | 'none'>({
      value: 'merc',
      defaultValue: 'merc',
    });
    this.isHorizontal = new InputStore<boolean>({
      value: false,
      defaultValue: false,
    });
    this.gridType = new InputStore<'hex' | 'rect'>({
      value: 'hex',
      defaultValue: 'hex',
    });
    this.cellSize = new InputStore<number>({
      value: 1000,
      defaultValue: 1000,
    });

    this.inputs = new InputsStore([
      this.name,
      this.desc,
      this.correction,
      this.isHorizontal,
      this.gridType,
      this.cellSize,
    ]);
  }
}