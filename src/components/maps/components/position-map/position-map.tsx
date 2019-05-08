import classNames from 'classnames/bind';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {
  createStaticGrider, 
  StaticGrider,
} from '@micelord/grider';
import {GeolocationStore} from '@stores/geolocation';
import {CtrlMapStore, DumbCtrlMap, withCtrlMapCtx} from '@components/maps-objects';
import {GridOverlay} from '../grid-overlay/grid-overlay';
import {SmartPolygon, SmartPolyline} from '@maps/feature';

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
  grider: StaticGrider;
  geolocationStore: GeolocationStore;
  mapStore: CtrlMapStore;
  gridAdded: boolean = false;
  startPoint: google.maps.LatLngLiteral | undefined;
  @observable projections: google.maps.LatLngLiteral[] = [];
  @observable border: google.maps.LatLngLiteral[] = [
    {lat: 47.06676604567628, lng: 36.796875}, 
    {lat: 54.317706011018224, lng: 40.7470703125},  
    {lat: 53.01600312774294, lng: 29.0234375},
    {lat: 54.51822185091831, lng: 24.814453125}, 
    {lat: 49.20018618540992, lng: 24.0576171875}, 
    {lat: 51.936842019727436, lng: 32.2314453125},
  ];
  @observable borderline: google.maps.LatLngLiteral[] = [];
  @observable poly?: google.maps.LatLngLiteral[];
  @observable intersects: google.maps.LatLngLiteral[] = [];

  constructor(props: Props) {
    super(props);

    this.grider = createStaticGrider({
      cellSize: 50000, // inner: 50000 - hex & rect - chack cleaner
      type: 'hex',
      correction: 'merc',
      // isHorizontal: true,
    });
    this.startPoint = this.grider.figureBuilder.cellFinder.findStartPoint(
      this.grider.calcGridCenterPointByGeoPoint(this.border[0]),
      this.grider.buildPolyByGeoPoint(this.border[0]),
      this.border,
      this.grider.params
    );
    this.geolocationStore = props.geolocationStore!;
    this.mapStore = props.mapStore!;
    this.borderline = this.grider.buildFigure([...this.border], false);
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

    console.log(this.grider.grider.calcGridPointByGeoPoint(coord, this.grider.params))

    // const cellCenter = this.grider.calcGridCenterPointByGeoPoint(coord);
    // this.poly = this.grider.buildPolyByCenterGridPoint(cellCenter);  
  }

  setBorderline = (borderline: google.maps.LatLngLiteral[]) => {
    this.borderline = borderline;
  }

  onCenterClick = (): void => {
    const {position} = this.geolocationStore;

    if (!position) return;

    this.mapStore.panTo(position);
  }

  onBorderChange = (newBorder: google.maps.LatLngLiteral[]) => {
    this.border = newBorder;
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
          <GridOverlay 
            grider={this.grider}
            borderline={this.borderline}
            border={this.border}
          />
          <PositionMarker />
          {this.poly && (
            <SmartPolygon
              paths={this.poly}
            />
          )}
          {this.props.children}
          <Borderline 
            border={this.border}
            grider={this.grider}
            borderline={this.borderline}
            setBorderline={this.setBorderline}
            outer
          />
          <EditableBorderline
            border={this.border}
            onPathChange={this.onBorderChange}
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
