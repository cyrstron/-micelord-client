import classNames from 'classnames/bind';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {createStaticGrider, StaticGrider, utils, grider, Grider} from '@micelord/grider';
import {GeolocationStore} from '@stores/geolocation';
import {CtrlMapStore, DumbCtrlMap, withCtrlMapCtx} from '@components/maps-objects';
import {SmartGridMapType} from '@maps/grid-map-type';
import {SmartPolygon, SmartMarker, SmartPolyline} from '@maps/feature';
import {SmartCustomOverlay} from '@maps/custom-overlay';

import {PositionMarker} from '../position-marker';
import {Borderline} from '../borderline';
import {SvgOverlay} from '../svg-overlay/svg-overlay';
import {EqDevpoly} from '../eqation-devpoly/equation-devpoly';

import styles from './position-map.scss';

const cx = classNames.bind(styles);

interface PositionMapProps {
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
}

type Props = PositionMapProps & {
  mapStore: CtrlMapStore,
}

const umbrellaPath = `
  M27
  14h5c0-1.105-1.119-2-2.5-2s-2.5
  0.895-2.5 2v0zM27
  14c0-1.105-1.119-2-2.5-2s-2.5 0.895-2.5
  2c0-1.105-1.119-2-2.5-2s-2.5
  0.895-2.5 2v0 14c0 1.112-0.895
  2-2 2-1.112
  0-2-0.896-2-2.001v-1.494c0-0.291
  0.224-0.505 0.5-0.505 0.268
  0 0.5 0.226 0.5 0.505v1.505c0
  0.547 0.444 0.991 1 0.991 0.552
  0 1-0.451 1-0.991v-14.009c0-1.105-1.119-2-2.5-2s-2.5
  0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5
  0.895-2.5 2c0-1.105-1.119-2-2.5-2s-2.5
  0.895-2.5 2c0-5.415 6.671-9.825
  15-9.995v-1.506c0-0.283 0.224-0.499
  0.5-0.499 0.268 0 0.5 0.224 0.5
  0.499v1.506c8.329 0.17 15 4.58 15 9.995h-5z
  `;

@inject('geolocationStore')
@observer
export class PositionMapWrapped extends Component<Props> {
  grider: StaticGrider;
  geolocationStore: GeolocationStore;
  mapStore: CtrlMapStore;
  gridAdded: boolean = false;
  startPoint: google.maps.LatLngLiteral | undefined;
  border: google.maps.LatLngLiteral[] = [
    {lat: 55, lng: 60}, 
    {lat: 60, lng: 40},  
    {lat: 60, lng: 35},
    {lat: 55, lng: 30}, 
    {lat: 52.5, lng: 35}, 
    {lat: 50, lng: 35},
  ];
  borderline: google.maps.LatLngLiteral[] = [];
  @observable poly?: google.maps.LatLngLiteral[] = [
    {lat: 55.2091195, lng: 31.875},
    {lat: 55.2091195, lng: 30},
    {lat: 53.5853219, lng: 29.0625},
    {lat: 51.9615242, lng: 30},
    {lat: 51.9615242, lng: 31.875},
    {lat: 53.5853219, lng: 32.8125},
  ];
  @observable intersects: google.maps.LatLngLiteral[] = [];

  constructor(props: Props) {
    super(props);

    this.grider = createStaticGrider({
      cellSize: 50000, // outer: 100000, 40000, inner: 40000
      type: 'hex',
      correction: 'none',
      isHorizontal: true,
    });
    // this.startPoint = this.grider.figureBuilder.cellFinder.findStartPoint(
    //   this.grider.calcGridCenterPointByGeoPoint(this.border[0]),
    //   this.grider.buildPolyByGeoPoint(this.border[0]),
    //   this.border,
    //   this.grider.params
    // );
    this.geolocationStore = props.geolocationStore!;
    this.mapStore = props.mapStore!;
  }

  componentDidMount() {
    this.geolocationStore.watchPosition();
  }

  componentWillUnmount() {
    this.geolocationStore.unwatchPosition();
  }

  onClick = (e: google.maps.MouseEvent) => {
    const coord = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    const poly = this.grider.buildPolyByGeoPoint(coord);

    this.poly = poly;
  }

  onCenterClick = (): void => {
    const {position} = this.geolocationStore;

    if (!position) return;

    this.mapStore.panTo(position);
  }

  render() {
    const {position} = this.geolocationStore;

    if (position === undefined) return null;

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
          <SmartGridMapType />
          <PositionMarker />
          {this.poly && (
            <SmartPolygon
              paths={this.poly}
            />
          )}
          {this.intersects.map((point: google.maps.LatLngLiteral, index: number) => (
            <SmartMarker 
              key={index}
              position={point} 
              title={`lat: ${point.lat}, lng: ${point.lng}`} 
            />
          ))}
          {this.startPoint && (            
            <SmartMarker 
              position={this.startPoint}
              title='First point'
            />
          )}
          <SmartPolygon 
            paths={this.grider.buildPolyByGeoPoint(this.border[0])}
            strokeColor='#006600'
          />
          {this.props.children}
          <Borderline 
            border={this.border}
            grider={this.grider}
          />
          <SmartPolygon 
            onClick={this.onClick}
            paths={this.border}
            strokeColor='#000066'
          />
          <SvgOverlay
            bounds={{
              east: 38.35,
              north: 51,
              south: 49,
              west: 33.39,
            }}
          />
        </DumbCtrlMap>
        <button onClick={this.onCenterClick}>Center</button>
      </>
    );
  }
}

export const PositionMap = withCtrlMapCtx<PositionMapProps>(PositionMapWrapped);
