import { observable, computed } from "mobx";
import { GridParams } from "@micelord/grider";

export interface NewGameStoreProps {
  name?: string;
  desc?: string;
  gridConfig?: grider.GridConfig;
}

export class NewGameStore {
  @observable name?: string;
  @observable desc?: string;
  @observable gridConfig?: grider.GridConfig;

  constructor({
    name,
    desc,
    gridConfig,
  }: NewGameStoreProps = {}) {
    this.name = name;
    this.desc = desc;
    this.gridConfig = gridConfig;
  }

  setName(name: string) {
    this.name = name;
  }

  setDesc(desc: string) {
    this.desc = desc;
  }

  setGridConfig(config: grider.GridConfig) {
    this.gridConfig = config;
  }

  @computed
  get gridParams(): GridParams | undefined {
    return this.gridConfig && GridParams.fromConfig(this.gridConfig);
  }
}