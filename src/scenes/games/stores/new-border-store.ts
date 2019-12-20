import { GeoPointStore } from "./point-store";
import { GeoPoint, Cell, Polygon, GeoPolygon, Figure, GridParams } from "@micelord/grider";
import { observable } from "mobx";
import { InputsStore, FormField } from "@stores/inputs-store";
import { NewGameStore } from "./new-game-store";

export class NewBorderStore {
  points: GeoPointStore[];
  inputs: InputsStore;

  @observable selfIntersections: GeoPoint[] = [];
  @observable invalidCells: Cell[] = [];
  
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

  constructor(
    public newGameStore: NewGameStore,
    points: grider.GeoPoint[],
  ) {
    this.points = points.map((point) => new GeoPointStore(point));

    this.inputs = new InputsStore({
      inputs: this.points,
      validate: this.validateFigure
    });
  }


}