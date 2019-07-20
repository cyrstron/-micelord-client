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
} from '@micelord/grider';
import {GeolocationStore} from '@stores/geolocation';
import {CtrlMapStore, DumbCtrlMap, withCtrlMapCtx} from '@components/maps-objects';
import {GridOverlay} from '../grid-overlay/grid-overlay';
import {SmartPolygon, SmartPolyline, SmartMarker} from '@maps/feature';

import {PositionMarker} from '../position-marker';
import {Borderline} from '../borderline';
import {EditableBorderline} from '../editable-borderline';

import styles from './position-map.scss';
import { GeoSegment } from '@micelord/grider/src';
import { GridPoint } from '@micelord/grider/src';
import { Line } from '@micelord/grider/src';
import { MercPoint } from '@micelord/grider/src/entities/points';
import { TileMercPoint } from '@micelord/grider/src';

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
  @observable tilePoint = TileMercPoint.fromTile(38, 21, 512, 512, 7);
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
    this.borderline = IndexatedFigure.fromShape(this.border, this.gridParams, false);
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

    const {tileX, tileY} = TileMercPoint.fromMerc(
      this.point.toMerc(), 
      512,
      512,
      this.mapStore.zoom || 7
    );

    this.tilePoint = TileMercPoint.fromTile(
      Math.floor(tileX), 
      Math.floor(tileY), 
      512, 
      512, 
      this.mapStore.zoom || 7
    );

    // this.cell = this.point.toCell(this.gridParams);
    // this.intersetions = this.border.intersectsPoly(this.cell);
    // const cell = this.cell;

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
    this.borderline = IndexatedFigure.fromShape(newBorder, this.gridParams, false);
  }

  // onClick: google.maps.MapMouseEventHandler = (e) => {
  //   console.log(e);

  //   const lat = e.latLng.lat();
  //   const lng = e.latLng.lng();

  //   const geoPoint = new GeoPoint(lat, lng);

  //   this.point = geoPoint;

  //   switch(this.active) {
  //     case 0:
  //       this.geoPointA = geoPoint;
  //       this.active = 1;
  //       break;
  //     case 1:
  //       this.geoPointB = geoPoint;
  //       this.active = 2;
  //       break;
  //     case 2:
  //       this.geoPointA = undefined;
  //       this.geoPointB = undefined;
  //       this.active = 0;
  //       break;
  //   }    
  // }

  render() {
    const {position} = this.geolocationStore;

    if (position === undefined) return null;

    // let closests: GeoPoint[] = [];
    // const {point} = this;

    // if (point) {
    //   closests = this.border.mapSides((
    //     side
    //   ) => {
    //     return side
    //   }).slice(0, 1).map((
    //     side
    //   ): GeoPoint => {
    //     return side.toMerc().line.closestToPoint(point.toMerc()).toSphere()
    //   }).slice(0, 1)
    // }

    // let pointA: GeoPoint | undefined;
    // let pointB: GeoPoint | undefined;
    // let point: GeoPoint | undefined;
    // if (this.geoPointA && this.geoPointB) {
    //   point = new GeoPoint(
    //     (this.geoPointA.lat + this.geoPointB.lat) / 2,
    //     (this.geoPointA.lng + this.geoPointB.lng) / 2,
    //   )
    //   const perp = Line.fromTwoPoints(
    //     this.geoPointA.toMerc(), 
    //     this.geoPointB.toMerc()
    //   ).perpendicularByPoint(
    //     point.toMerc()
    //   );

    //   const yA = perp.xByY(this.geoPointA.toMerc().x);
    //   const yB = perp.xByY(this.geoPointB.toMerc().x);

    //   if (yA !== undefined) {
    //     pointA = new MercPoint(
    //       this.geoPointA.toMerc().x,
    //       yA,
    //     ).toSphere();
    //   }
    //   if (yB !== undefined) {
    //     pointB = new MercPoint(
    //       this.geoPointB.toMerc().x,
    //       yB,
    //     ).toSphere();
    //   }
    // }

    const tileIntersection = this.borderline.indexation.tileIntersection(this.tilePoint);

    console.log(tileIntersection);

    const segments = tileIntersection.north;
    segments.push(...tileIntersection.east);
    segments.push(...tileIntersection.west);
    segments.push(...tileIntersection.south);

    const polyIntersects = this.borderline.splitSectionsByLat(this.tilePoint.northBound);

    polyIntersects.push(...this.borderline.splitSectionsByLat(this.tilePoint.southBound));
    polyIntersects.push(...this.borderline.splitSectionsByLng(this.tilePoint.eastBound));
    polyIntersects.push(...this.borderline.splitSectionsByLng(this.tilePoint.westBound));

    // const points = this.cell ? this.cell.reduceSides((
    //   intersects: GeoPoint[], 
    //   sideA
    // ): GeoPoint[] => {
    //   intersects.push(...this.border.reduceSides((
    //     intersects: GeoPoint[], 
    //     sideB
    //   ): GeoPoint[] => {
    //     const intersect = sideA.intersectionPoint(sideB);

    //     if (intersect) {
    //       intersects.push(intersect);
    //     }

    //     return intersects;
    //   }, []));

    //   return intersects;
    // }, []) : [];

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
              paths={this.borderline.points} 
              onClick={this.onClick}
            />
          )}
          {/* {polyIntersects.map((segment, index) => (
            <SmartPolyline
              path={segment.points}
              strokeColor={'rgba(50, 0, 200, 0.5)'}
              zIndex={10}
              key={`segment-${index}`}
            />
          ))} */}
          {/* {this.gridPointA && this.gridPointB && this.gridPointC && (
            <SmartPolyline 
              path={[
                this.gridPointA.toGeo(),
                this.gridPointB.toGeo(),
                this.gridPointC.toGeo(),
              ]} 
              strokeColor='#f00'
              zIndex={10}
            />
          )} */}
          {/* {this.geoPointA && this.geoPointB && (
            <SmartPolyline 
              path={[
                this.geoPointA,
                this.geoPointB,
              ]} 
              strokeColor='#f00'
              zIndex={10}
            />
          )} */}
          {/* {pointA && pointB && (
            <SmartPolyline 
              path={[
                pointA,
                pointB,
              ]} 
              strokeColor='#0f0'
              zIndex={10}
            />
          )} */}
          {/* {this.borderline && this.borderline.points.length > 0 && (
            <SmartMarker 
              position={this.borderline.points[0]}
              title={'start'}
            />
          )} */}
          {/* {closests.map((point, index) => (
            <SmartMarker 
              position={point}
              title={`closest-${index}`}
            />
          ))} */}
          {segments.map((segment, index) => {
            return (
              <SmartPolyline 
                path={segment.points}
                key={`grid-point-${index}`}
                strokeColor={'rgba(50, 0, 200, 0.5)'}
              />
            );
          })}
          {this.nextCells.map((cell, index) => (
            <SmartPolygon 
              paths={cell.points}
              strokeColor='#0f0'
              key={`intersection-${index}}`}
              onClick={this.onClick}
            />
          ))}
          {/* {this.intersetions.map((point, index) => (
            <SmartMarker 
              position={point}
              title={`intersection-${index}`}
              key={`intersection-${index}`}
            />
          ))} */}
          <GridOverlay 
            params={this.gridParams}
            borderline={this.borderline}
          />
          <PositionMarker />
          {/* {this.poly && (
            <SmartPolygon
              paths={this.poly}
            />
          )} */}
          {this.props.children}
          {/* <Borderline 
            border={this.border}
            grider={this.grider}
            borderline={this.borderline}
            setBorderline={this.setBorderline}
            outer
          /> */}
          <EditableBorderline
            border={this.border}
            gridParams={this.gridParams}
            onPathChange={this.onBorderChange}
          />
          <SmartPolygon
            paths={this.tilePoint.toPoly().points}
            onClick={this.onClick}
            strokeColor={'#900'}
          />
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
