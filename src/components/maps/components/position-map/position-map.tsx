import classNames from 'classnames/bind';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {
  GeoPoint,
  GridParams,
  Cell,
  Figure,
  IndexatedFigure,
  GeoPolygon,
  GridPoint,
} from '@micelord/grider';
import {GeolocationStore} from '@stores/geolocation';
import {CtrlMapStore, DumbCtrlMap, withCtrlMapCtx} from '@components/maps-objects';
import {GridOverlay} from '../grid-overlay/grid-overlay';
import {SmartPolygon, SmartPolyline, SmartMarker} from '@maps/feature';

import {PositionMarker} from '../position-marker';
import {Borderline} from '../borderline';
import {EditableBorderline} from '../editable-borderline';

import styles from './position-map.scss';

const cx = classNames.bind(styles);

interface PositionMapProps {
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
}

type Props = PositionMapProps & {
  mapStore: CtrlMapStore,
}

@inject('geolocationStore')
@observer
export class PositionMapWrapped extends Component<Props> {
  geolocationStore: GeolocationStore;
  mapStore: CtrlMapStore;
  gridAdded: boolean = false;
  startPoint: GeoPoint | undefined;
  activePoint: number = 0;
  gridParams = new GridParams({
    type: 'hex',
    correction: 'merc',
    cellSize: 100000,
    // isHorizontal: true,
  });
  @observable point: GeoPoint | undefined;
  @observable cell: Cell | undefined;
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
  @observable borderline: IndexatedFigure;
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
    this.mapStore = props.mapStore!;
    this.borderline = IndexatedFigure.fromShape(this.border, this.gridParams);
  }

  componentDidMount() {
    this.geolocationStore.watchPosition();
  }

  componentWillUnmount() {
    this.geolocationStore.unwatchPosition();
  }

  onClick = (e: google.maps.MouseEvent) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const point = new GeoPoint(lat, lng);

    console.log(point);

    this.point = point;

    this.cell = this.point.toCell(this.gridParams);
    // this.intersetions = this.border.intersectsPoly(this.cell);

    // if (!cell) return;

    // console.log(cell)
    // console.log(this.point)

    // this.nextCells = this.border.reduceSides((nextCells, side) => {
    //   const nextCell = cell.nextCellOnSegment(side);

    //   if (nextCell) {
    //     nextCells.push(nextCell);
    //   }

    //   return nextCells;
    // }, [] as Cell[])
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

  onBorderChange = (newBorder: GeoPolygon) => {
    this.border = newBorder;
    this.borderline = IndexatedFigure.fromShape(newBorder, this.gridParams);
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

    return (
      <>
        <DumbCtrlMap
          className={cx('fullscreen-map')}
          defaultCenter={position}
          zoom={8}
          clickableIcons={false}
          disableDefaultUI={false}
          gestureHandling='greedy'
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          fullscreenControl={false}
          onClick={this.onClick}
        >
          {/* {this.point && (
            <SmartMarker position={this.point} title='point' />
          )} */}
          {/* {point && (
            <SmartMarker position={point} title='pointCenter' />
          )} */}
          {this.cell && (
            <SmartPolygon 
              paths={this.cell.points} 
              onClick={this.onClick}
            />
          )}
          {this.borderline && (
            <SmartPolygon 
              paths={this.borderline.fullPoints.points} 
              onClick={this.onClick}
              strokeColor='green'
              fillColor='transparent'
            />
          )}
          {intersects.map((point, index) => (
            <SmartMarker 
              position={point}
              title={`{lat: ${point.lat}, lng: ${point.lng}}`}
              key={`intersect-${index}`}
            />
          ))}
          {/* {segments.map((segment, index) => {
            return (
              <SmartPolyline 
                path={segment.points}
                key={`grid-point-${index}`}
                strokeColor={'rgba(50, 0, 200, 0.5)'}
              />
            );
          })} */}
          {/* {this.nextCells.map((cell, index) => (
            <SmartPolygon 
              paths={cell.points}
              strokeColor='#0f0'
              key={`intersection-${index}}`}
              onClick={this.onClick}
            />
          ))} */}
          <GridOverlay 
            params={this.gridParams}
            borderline={this.borderline}
          />
          <PositionMarker />
          {this.props.children}
          {/* <EditableBorderline
            border={this.border}
            gridParams={this.gridParams}
            onPathChange={this.onBorderChange}
          /> */}
          {/* <SmartPolygon
            paths={this.tilePoint.toPoly().points}
            onClick={this.onClick}
            strokeColor={'#900'}
          /> */}
          {/* <SvgOverlay
            bounds={{
              east: 38.35,
              north: 51,
              south: 49,
              west: 33.39,
            }}
          /> */}
        </DumbCtrlMap>
        <button onClick={this.onCenterClick}>Center</button>
      </>
    );
  }
}

export const PositionMap = withCtrlMapCtx<PositionMapProps>(PositionMapWrapped);
