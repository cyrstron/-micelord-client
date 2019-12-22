import { GeoPointStore } from "./point-store";
import { GeoPoint, Cell, Polygon, GeoPolygon, Figure, GridParams } from "@micelord/grider";
import { observable, computed, action } from "mobx";
import { InputsStore, FormField } from "@stores/inputs-store";
import { NewGameStore } from "./new-game-store";

export class NewBorderStore {
  @observable points: GeoPointStore[];
  @observable editedPointIndex?: number;

  inputs: InputsStore;

  @observable selfIntersections: GeoPoint[] = [];
  @observable invalidCells: Cell[] = [];
  
  constructor(
    public newGameStore: NewGameStore,
    points: grider.GeoPoint[] = [],
  ) {
    this.points = points.map((point) => new GeoPointStore(point));

    this.inputs = new InputsStore({
      inputs: this.points,
      validate: this.validateFigure
    });
  }

  @action
  editPoint(pointIndex: number) {
    this.editedPointIndex = pointIndex;
  }

  @action
  resetEditing() {
    this.editedPointIndex = undefined;
  }

  @action
  addPoint(geoPoint: grider.GeoPoint) {
    this.points = [
      new GeoPointStore(geoPoint),
      ...this.points,
    ];

    this.inputs.setInputs(this.points);
  }

  @action
  deletePoint(index: number) {
    this.points = [
      ...this.points.slice(0, index),
      ...this.points.slice(index + 1),
    ];

    this.inputs.setInputs(this.points);
  }

  @action
  updateSelectedPoint(point: grider.GeoPoint) {
    const {editedPointIndex} = this;

    if (editedPointIndex === undefined) return;

    this.updatePoint(editedPointIndex, point);
  }

  @action
  updatePoint(index: number, point: grider.GeoPoint) {
    const pointStore = this.points[index];

    if (!pointStore) return;

    pointStore.setPoint(point);
  }

  @action
  reset() {
    this.points = [];

    this.inputs.setInputs([]);
  }

  validateFigure = async (inputs: FormField<grider.GeoPoint>[]) => {

    if (inputs.length < 3) throw new Error('Border should have at least 3 points');

    const {gridParams} = this.newGameStore;

    if (!gridParams) throw new Error('Grid parameters should be specified');
    
    const borderPoints = inputs.map(({value}) => GeoPoint.fromPlain(value));

    const borderPoly = new GeoPolygon(borderPoints);

    const {cells, points} = await Figure.validateShape(borderPoly, gridParams);

    this.selfIntersections = points;
    this.invalidCells = cells;

    if (points.length > 0) throw new Error('Border shouldn\'t intersect itself');
    
    if (cells.length > 0) throw new Error('Border points should be further from each other');
  }

  @computed
  get values(): grider.GeoPoint[] {
    return this.points.map(({value}) => value);
  }

  @computed
  get polyline(): grider.GeoPoint[] {
    const {values} = this;

    if (values.length <= 2) return values;

    return [...values, values[0]];
  }

  @computed
  get isPending() {
    return this.inputs.isPending;
  }

  get isValid() {
    return this,this.inputs.isValid;
  }
  
  @computed
  get error() {
    return this.inputs.error;
  }

  @action
  async onApply() {
    await this.inputs.validate();

    if (!this.inputs.isValid) return;

    this.newGameStore.setBorderFigure(this.values);
  }
}