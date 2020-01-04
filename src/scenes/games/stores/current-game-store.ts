import { observable, action, computed } from "mobx";
import { Game } from "@state/actions/games-requests/actions";
import {
  GridParams, 
  IndexatedFigure, 
  GeoPolygon, 
  Cell, 
  GeoPoint 
} from "@micelord/grider";

class CurrentGameStore {
  @observable isReady = false;

  @observable game?: Game;
  @observable borderFigure?: IndexatedFigure;

  @observable error?: Error;
  @observable currentObject?: Cell;
  @observable selectedObject?: Cell;

  position: GeoPoint;

  constructor(position: GeoPoint) {
    this.position = position;
  }

  @computed
  get gridParams(): GridParams | undefined {
    return this.game && GridParams.fromConfig(this.game.gridConfig);
  }

  @action
  async setGame(game: Game) {
    this.game = game;

    if (!this.gridParams) return;

    try {
      const polygon = GeoPolygon.fromPlain(game.border);

      this.borderFigure = await IndexatedFigure.fromShape(polygon, this.gridParams);

      const cell = Cell.fromGeoPoint(this.position, this.gridParams!);

      this.currentObject = cell;
      this.selectedObject = cell;

      this.isReady = true;
    } catch (err) {
      this.error = err;
    }
  }

  @action
  resetGame() {
    this.game = undefined;
    this.borderFigure = undefined;
    this.error = undefined;
    this.isReady = false;
    this.currentObject = undefined;
    this.selectedObject = undefined;
  }

  selectObject(object: Cell) {
    this.selectedObject = object;
  }
  
  setPosition(position: GeoPoint) {
    this.position = position;

    if (!this.isReady) return;

    if (this.currentObject && this.currentObject.containsPoint(this.position)) return;

    this.currentObject = Cell.fromGeoPoint(position, this.gridParams!);
  }
}

export {CurrentGameStore}