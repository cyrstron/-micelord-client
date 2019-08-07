import classNames from 'classnames/bind';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {
  GeoPoint,
  GridParams,
  Cell,
  Area,
  IndexatedFigure,
  GeoPolygon,
  GridPoint,
  CenterPoint,
  CellConnection,
} from '@micelord/grider';
import {GeolocationStore} from '@stores/geolocation';
import {
  CtrlMapStore, 
  DumbCtrlMap, 
  withCtrlMapCtx, 
  SmartPolygon, 
  SmartPolyline, 
  SmartMarker
} from '@micelord/maps';
import {GridOverlay} from '../grid-overlay/grid-overlay';
import {CellPoly} from '../cell/cell';

import {PositionMarker} from '../position-marker';
import testCells from './test-cells.json';

import styles from './position-map.scss';

const cx = classNames.bind(styles);

interface PositionMapProps {
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
}

type Props = PositionMapProps & {
  // mapStore: CtrlMapStore,
}

@inject('geolocationStore')
@observer
export class PositionMapWrapped extends Component<Props> {
  geolocationStore: GeolocationStore;
  mapStore: CtrlMapStore;
  gridAdded: boolean = false;
  startPoint: GeoPoint | undefined;
  activePoint: number = 0;
  gridParams = GridParams.fromConfig({
    type: 'hex',
    correction: 'merc',
    cellSize: 10000,
    isHorizontal: true,
  });
  @observable point: GeoPoint | undefined;
  @observable area: Area | undefined;
  @observable cell: Cell | undefined;
  @observable cellA = new Cell(new CenterPoint(this.gridParams, 40, 36, -76));
  @observable cells: Cell[] = [] //testCells.map(
    // ({i, j ,k}) => new CenterPoint(this.gridParams, i, j, k).toCell()
  // );
  @observable connection: CellConnection | undefined;
  @observable nextCells: Cell[] = [];
  @observable intersetions: GeoPoint[] = [];
  // @observable projections: google.maps.LatLngLiteral[] = [];
  @observable border: GeoPolygon = new GeoPolygon([
    {lat: 47.06676604567628, lng: 36.796875}, 
    {lat: 54.317706011018224, lng: 40.7470703125},  
    {lat: 53.01600312774294, lng: 29.0234375},
    {lat: 54.51822185091831, lng: 24.814453125}, 
    {lat: 49.20018618540992, lng: 24.0576171875}, 
    {lat: 51.936842019727436, lng: 32.2314453125},
  ].map(({lat, lng}) => new GeoPoint(lat, lng)));
  @observable borderline?: IndexatedFigure;
  // @observable tilePoint = TileMercPoint.fromTile(38, 22, 512, 512, 7);
  // @observable poly?: google.maps.LatLngLiteral[];
  // @observable intersects: google.maps.LatLngLiteral[] = [];

  @observable gridPointA: GridPoint | undefined;
  @observable gridPointB: GridPoint | undefined;
  @observable gridPointC: GridPoint | undefined;

  @observable geoPointA: GeoPoint | undefined;
  @observable geoPointB: GeoPoint | undefined;

  active: number = 0;

  constructor(props: Props) {
    super(props);

    // this.grider = createStaticGrider({
    //   cellSize: 50000, // inner: 50000 - hex & rect - chack cleaner
    //   type: 'hex',
    //   correction: 'merc',
    //   // isHorizontal: true,
    // });
    // this.startPoint = this.grider.figureBuilder.cellFinder.findStartPoint(
    //   this.grider.calcGridCenterPointByGeoPoint(this.border[0]),
    //   this.grider.buildPolyByGeoPoint(this.border[0]),
    //   this.border,
    //   this.grider.params
    // );
    this.geolocationStore = props.geolocationStore!;
    // this.mapStore = props.mapStore!;
    this.onBorderChange(this.border);
  }

  componentDidMount() {
    this.geolocationStore.watchPosition();
  }

  componentWillUnmount() {
    this.geolocationStore.unwatchPosition();
  }

  onClick = async (e: google.maps.MouseEvent) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const point = new GeoPoint(lat, lng);

    console.log(point);
    console.log(this.border.containsPoint(point));

    this.point = point;

    const center = CenterPoint.fromGeo(this.point, this.gridParams);
    const cell = Cell.fromCenter(center);

    if (!cell) return;

    this.cell = cell;

    // this.connection = CellConnection.fromCenters(this.cellA.center, this.cell.center);


    const cells = [...this.cells, cell];

    const centers = await Area.biggestSet(cells.map(({center}) => center));

    this.cells = centers.map((center) => Cell.fromCenter(center));

    this.area = await Area.fromCellCenters(centers)

    console.log(cell.center);

    // const cellIndex = this.cells.findIndex(
    //   (cellContaned) => cellContaned.isEqual(cell)
    // );
    
    // if (cellIndex === -1) {
    //   this.cells = [...this.cells, cell];
    // } else {
    //   this.cells = [
    //     ...this.cells.slice(0, cellIndex),
    //     ...this.cells.slice(cellIndex + 1),
    //   ];
    // }

    this.intersetions = this.border.intersectsPoly(cell);

    // if (!cell) return;

    // console.log(cell)
    // console.log(this.point)

    this.nextCells = this.border.reduceSides((nextCells, side) => {
      // const nextCell = cell.nextCellOnSegment(side);

      // if (nextCell) {
      //   nextCells.push(nextCell);
      // }

      return nextCells;
    }, [] as Cell[])
    // console.log(this.cell.center);
    // console.log(this.cell.points);
    // console.log(this.point.toGrid(this.gridParams));
  }

  // setBorderline = (borderline: google.maps.LatLngLiteral[]) => {
  //   this.borderline = borderline;
  // }

  onCenterClick = (): void => {
    const {position} = this.geolocationStore;

    if (!position) return;

    this.mapStore.panTo(position);
  }

  onBorderChange = async (newBorder: GeoPolygon) => {
    this.border = newBorder;
    this.borderline = await IndexatedFigure.fromShape(newBorder, this.gridParams);
  }

  render() {
    const {position} = this.geolocationStore;

    if (position === undefined) return null;

    // const tileIntersection = this.borderline.indexation.tileIntersection(this.tilePoint);

    const intersects: GeoPoint[] = [];

    // this.borderline.indexation.indexations.forEach((
    //   sideIndexation,
    // ) => {
    //   const northIntersect = sideIndexation.boundIntersection(this.tilePoint.northBound, this.tilePoint.toPoly(), 'north');
    //   const southIntersect = sideIndexation.boundIntersection(this.tilePoint.southBound, this.tilePoint.toPoly(), 'south');
    //   const eastIntersect = sideIndexation.boundIntersection(this.tilePoint.eastBound, this.tilePoint.toPoly(), 'east');
    //   const westIntersect = sideIndexation.boundIntersection(this.tilePoint.westBound, this.tilePoint.toPoly(), 'west');

    //   if (northIntersect) {
    //     intersects.push(northIntersect.intersection);
    //   }
    //   if (southIntersect) {
    //     intersects.push(southIntersect.intersection);
    //   }
    //   if (eastIntersect) {
    //     intersects.push(eastIntersect.intersection);
    //   }
    //   if (westIntersect) {
    //     intersects.push(westIntersect.intersection);
    //   }
    // });
    // console.log(intersects.length);
    // console.log(tileIntersection);

    // const segments = tileIntersection.north;
    // segments.push(...tileIntersection.east);
    // segments.push(...tileIntersection.west);
    // segments.push(...tileIntersection.south);

    // const polyIntersects = this.borderline.splitSectionsByLat(this.tilePoint.northBound);

    // polyIntersects.push(...this.borderline.splitSectionsByLat(this.tilePoint.southBound));
    // polyIntersects.push(...this.borderline.splitSectionsByLng(this.tilePoint.eastBound));
    // polyIntersects.push(...this.borderline.splitSectionsByLng(this.tilePoint.westBound));

    return null;
    // return (
      // <>
      //   <DumbCtrlMap
      //     className={cx('fullscreen-map')}
      //     defaultCenter={position}
      //     zoom={8}
      //     clickableIcons={false}
      //     disableDefaultUI={false}
      //     gestureHandling='greedy'
      //     mapTypeControl={false}
      //     streetViewControl={false}
      //     zoomControl={false}
      //     fullscreenControl={false}
      //     onClick={this.onClick}
      //   >
      //     {this.borderline && (
      //       <SmartMarker position={this.borderline.points[0]} title='point' />
      //     )}
      //     {/* {point && (
      //       <SmartMarker position={point} title='pointCenter' />
      //     )} */}
      //     {this.cell && (
      //       <CellPoly 
      //         cell={this.cell} 
      //       />
      //     )}
      //     {/* {this.cells.map((cell, index) => (
      //       <CellPoly
      //         cell={cell}
      //         key={`cell-${index}`}
      //       />
      //     ))} */}
      //     {this.borderline && (
      //       <SmartPolygon 
      //         paths={this.borderline.fullPoints.points} 
      //         onClick={this.onClick}
      //         strokeColor='green'
      //         fillColor='transparent'
      //       />
      //     )}
      //     {this.area && (
      //       <SmartPolygon 
      //         paths={this.area.polys} 
      //         onClick={this.onClick}
      //         strokeColor='green'
      //         fillColor='green'
      //       />
      //     )}
      //     <SmartPolygon 
      //       paths={[
      //         [{lat: 50, lng: 100}, {lat: 40, lng: 120}, {lat: 55, lng: 110}],
      //         [{lat: 50, lng: 105}, {lat: 47, lng: 110}, {lat: 50, lng: 108}]
      //       ]} 
      //       onClick={this.onClick}
      //       strokeColor='green'
      //       fillColor='green'
      //     />
      //     {/* {this.borderline && (
      //       <SmartPolygon 
      //         paths={this.border.points} 
      //         onClick={this.onClick}
      //       />
      //     )} */}
      //     {this.intersetions.map((point, index) => (
      //       <SmartMarker 
      //         position={point}
      //         title={`{lat: ${point.lat}, lng: ${point.lng}}`}
      //         key={`intersect-${index}`}
      //       />
      //     ))}
      //     {this.connection && (
      //         <SmartPolyline 
      //           path={this.connection.path}
      //           strokeColor={'rgba(50, 0, 200, 0.5)'}
      //         />
      //     )}
      //     {this.nextCells.map((cell, index) => (
      //       <CellPoly
      //         cell={cell}
      //         key={`next-cell-${index}`}
      //       />
      //     ))}
      //     {this.borderline && (
      //       <GridOverlay 
      //         params={this.gridParams}
      //         borderline={this.borderline}
      //       />
      //     )}
      //     <PositionMarker />
      //     {this.props.children}
      //     {/* <EditableBorderline
      //       border={this.border}
      //       gridParams={this.gridParams}
      //       onPathChange={this.onBorderChange}
      //     /> */}
      //     {/* <SmartPolygon
      //       paths={this.tilePoint.toPoly().points}
      //       onClick={this.onClick}
      //       strokeColor={'#900'}
      //     /> */}
      //     {/* <SvgOverlay
      //       bounds={{
      //         east: 38.35,
      //         north: 51,
      //         south: 49,
      //         west: 33.39,
      //       }}
      //     /> */}
      //   </DumbCtrlMap>
      //   <button onClick={this.onCenterClick}>Center</button>
      // </>
    // );
  }
}

// export const PositionMap = PositionMapWrapped;

export const PositionMap = withCtrlMapCtx<PositionMapProps>(PositionMapWrapped);
