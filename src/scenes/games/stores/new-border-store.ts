import { GeoPointStore } from "./point-store";

export class NewBorderStore {
  points: GeoPointStore[];

  constructor(
    points: grider.GeoPoint[],
  ) {
    this.points = points.map((point) => new GeoPointStore(point));
  }
}