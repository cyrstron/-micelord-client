import { InputStore } from "@stores/input-store";
import { InputsStore } from "@stores/inputs-store";
import { computed } from "mobx";

interface NewGameFormStoreProps {
  name?: string;
  desc?: string;
}

export class NewGameFormStore {
  name: InputStore;
  desc: InputStore;
  correction: InputStore<'merc' | 'none'>;
  isHorizontal: InputStore<boolean>;
  gridType: InputStore<'hex' | 'rect'>;
  cellSize: InputStore<string>;

  inputs: InputsStore;

  validateName = (value: string) => {
    if (!value) throw new Error('Game name is required field');

    if (value.length > 50) throw new Error('Game name shouldn\'t be bigger than 50 characters');
    
    if (value.length < 3) throw new Error('Game name shouldn\'t be less than 3 characters');
  }

  validateDesc = (value: string) => {
    if (value.length > 200) throw new Error('Game description shouldn\'t be bigger than 200 characters');
  }

  validateCellSize = (value: string) => {
    const valueNumber = +value;

    if (isNaN(valueNumber)) throw new Error('Invalid cell size');

    if (valueNumber < 5) throw new Error('Cell size shouldn\'t be less than  5');
    
    if (valueNumber > 10000000) throw new Error('Cell size shouldn\'t be more than 10000000');
  }

  @computed
  get values(): {
    name: string;
    desc: string;
    correction: 'merc' | 'none';
    isHorizontal: boolean;
    gridType: 'hex' | 'rect';
    cellSize: number;
  } {
    return {
      name: this.name.value,
      desc: this.desc.value,
      correction: this.correction.value,
      isHorizontal: this.isHorizontal.value,
      gridType: this.gridType.value,
      cellSize: +this.cellSize.value,
    };
  }

  constructor({
    name = '',
    desc = '',
  }: NewGameFormStoreProps = {}) {
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
    this.cellSize = new InputStore({
      value: '100',
      defaultValue: '100',
    });

    this.inputs = new InputsStore({
      inputs: [
        this.name,
        this.desc,
        this.correction,
        this.isHorizontal,
        this.gridType,
        this.cellSize,
      ],
    });
  }
}