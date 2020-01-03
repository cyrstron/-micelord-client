import { observable, computed, action } from "mobx";
import { GridParams, IndexatedFigure, GeoPolygon } from "@micelord/grider";
import { NewBorderStore } from "./new-border-store";
import { GamePayload } from "@state/actions/games-requests/actions";

export interface NewGameStoreProps {
  name?: string;
  desc?: string;
  gridConfig?: grider.GridConfig;
}

export class NewGameStore {
  @observable name?: string;
  @observable desc?: string;
  @observable gridConfig?: grider.GridConfig;
  @observable borderFigure?: IndexatedFigure;

  newBorderStore: NewBorderStore;

  constructor({
    name,
    desc,
    gridConfig,
  }: NewGameStoreProps = {}) {
    this.name = name;
    this.desc = desc;
    this.gridConfig = gridConfig;

    this.newBorderStore = new NewBorderStore(this, []);
  }

  @action
  setName(name: string) {
    this.name = name;
  }

  @action
  setDesc(desc: string) {
    this.desc = desc;
  }

  @action
  setGridConfig(config: grider.GridConfig) {
    this.gridConfig = config;
  }

  @action
  reset() {
    this.name = undefined;
    this.desc = undefined;
    this.gridConfig = undefined;
    this.borderFigure = undefined;
    this.newBorderStore.reset();
  }

  setBorderFigure(borderFigure: IndexatedFigure) {
    this.borderFigure = borderFigure;
  }

  resetBorderFigure() {
    this.borderFigure = undefined;
  }

  @computed
  get gridParams(): GridParams | undefined {
    return this.gridConfig && GridParams.fromConfig(this.gridConfig);
  }

  @computed
  get gamePayload(): GamePayload {
    return {
      name: this.name!,
      gridConfig: this.gridConfig!,
      description: this.desc,
      border: this.newBorderStore.values,
    };
  }
}