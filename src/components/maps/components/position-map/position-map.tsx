import classNames from 'classnames/bind';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {createStaticGrider, StaticGrider, utils} from '@micelord/grider';
import {GeolocationStore} from '@stores/geolocation';
import {CtrlMapStore, DumbCtrlMap, withCtrlMapCtx} from '@components/maps-objects';
import {SmartGridMapType} from '@maps/grid-map-type';
import {SmartPolygon, SmartMarker} from '@maps/feature';
import {SmartCustomOverlay} from '@maps/custom-overlay';

import {PositionMarker} from '../position-marker';
import {Borderline} from '../borderline';

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
  border: google.maps.LatLngLiteral[] = [{
    lat: 55,
    lng: 30,
  }, {
    lat: 50,
    lng: 35,
  }, {
    lat: 55,
    lng: 40,
  }, {
    lat: 60,
    lng: 35,
  }];
  border1: google.maps.LatLngLiteral[] = [{
    lat: 60,
    lng: 30,
  }, {
  //   lat: 56.25,
  //   lng: 31.25,
  // }, {
  //   lat: 52.5,
  //   lng: 32.5,
  // }, {
    lat: 45,
    lng: 35,
  }, {
    lat: 60,
    lng: 40,
  }, {
    lat: 65,
    lng: 35,
  }];
  border2: google.maps.LatLngLiteral[] = [{
    lat: 60,
    lng: 30,
  }, {
    lat: 45,
    lng: 35,
  }, {
    lat: 60,
    lng: 40,
  }, {
    lat: 65,
    lng: 35,
  }];
  @observable poly?: google.maps.LatLngLiteral[];
  @observable intersects: google.maps.LatLngLiteral[] = this.border.reduce((
    intersects: google.maps.LatLngLiteral[], 
    point: google.maps.LatLngLiteral, 
    index: number
  ): google.maps.LatLngLiteral[] => {
    const nextPoint = this.border[index + 1] || this.border[0];
    const sectionA: [
      google.maps.LatLngLiteral,
      google.maps.LatLngLiteral
    ] = [point, nextPoint];

    this.border1.forEach((polyPoint, index) => {
      const nextPolyPoint = this.border1[index + 1] || this.border1[0];
      const sectionB: [
        google.maps.LatLngLiteral,
        google.maps.LatLngLiteral
      ]  = [polyPoint, nextPolyPoint];

      const intersect = utils.geography.calcSectionsIntersect(sectionA, sectionB);

      if (!intersect) return;

      intersects.push(intersect);
    });

    return intersects;
  }, []);;

  constructor(props: Props) {
    super(props);

    this.grider = createStaticGrider({
      cellSize: 300000,
      type: 'hex',
      correction: 'none',
      isHorizontal: true,
    });
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

    console.log(coord);
    console.log(utils.geography.polyContainsPoint(this.border, coord));



    // const poly = this.grider.buildPolyByGeoPoint(coord);

    // const intersects = this.border.reduce((
    //   intersects: google.maps.LatLngLiteral[], 
    //   point: google.maps.LatLngLiteral, 
    //   index: number
    // ): google.maps.LatLngLiteral[] => {
    //   const nextPoint = this.border[index + 1] || this.border[0];
    //   const sectionA: [
    //     google.maps.LatLngLiteral,
    //     google.maps.LatLngLiteral
    //   ] = [point, nextPoint];

    //   poly.forEach((polyPoint, index) => {
    //     const nextPolyPoint = poly[index + 1] || poly[0];
    //     const sectionB: [
    //       google.maps.LatLngLiteral,
    //       google.maps.LatLngLiteral
    //     ]  = [polyPoint, nextPolyPoint];

    //     const intersect = utils.geography.calcSectionsIntersect(sectionA, sectionB);

    //     if (!intersect) return;

    //     intersects.push(intersect);
    //   });

    //   return intersects;
    // }, []);

    // this.intersects = intersects;

    // this.poly = poly;
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
          <Borderline 
            grider={this.grider} 
            border={this.border}            
            onClick={this.onClick}
          />
          <SmartGridMapType />
          <PositionMarker />
          {this.poly && (
            <SmartPolygon
              paths={this.poly}
            />
          )}
          {/* <SmartPolygon
            paths={this.border}
            strokeColor='#ff0000'
          />
          <SmartPolygon
            paths={this.border2}
            strokeColor='#0000ff'
          />
          <SmartPolygon
            paths={this.border1}
            strokeColor='#00ff00'
          /> */}
          {this.intersects.map((point: google.maps.LatLngLiteral, index: number) => (
            <SmartMarker 
              key={index}
              position={point} 
              title={`lat: ${point.lat}, lng: ${point.lng}`} 
            />
          ))}
          {this.props.children}
          <SmartCustomOverlay
            bounds={{
              east: 38.35,
              north: 51,
              south: 49,
              west: 33.39,
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 32 32'
              aria-labelledby='title'
            >
              <title id='title'>Umbrella Icon</title>
              <path d={umbrellaPath}/>
            </svg>
          </SmartCustomOverlay>
        </DumbCtrlMap>
        <button onClick={this.onCenterClick}>Center</button>
      </>
    );
  }
}

export const PositionMap = withCtrlMapCtx<PositionMapProps>(PositionMapWrapped);
