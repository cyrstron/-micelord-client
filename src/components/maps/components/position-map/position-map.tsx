import classNames from 'classnames/bind';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {GeolocationStore} from '@stores/geolocation';
import {PositionMarker} from '../position-marker';
import {EditableBorderline} from '../editable-borderline';
import {
  DumbMap,
  withSmartMapCtx,
  MapService,
  Marker,
  Polygon,
} from '@micelord/maps';
import {
  GeoPoint, 
  Cell, 
  GridParams, 
  GeoPolygon,
  IndexatedFigure,
} from '@micelord/grider';

import styles from './position-map.scss';
import { observable, transaction } from 'mobx';
import { CellPoly } from '../cell/cell';
import { GridOverlay } from '../grid-overlay/grid-overlay';

const cx = classNames.bind(styles);

interface PositionMapProps {
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
}

type Props = PositionMapProps & {
  mapService?: MapService,
}

@inject('geolocationStore')
@observer
export class PositionMapWrapped extends Component<Props> {
  geolocationStore: GeolocationStore;
  params = GridParams.fromConfig({
    type: 'hex',
    correction: 'merc',
    cellSize: 10000,
  });

  @observable point?: GeoPoint;
  @observable cell?: Cell;
  @observable border: GeoPolygon = new GeoPolygon([
    {lat: 47.06676604567628, lng: 36.796875}, 
    {lat: 54.317706011018224, lng: 40.7470703125},  
    {lat: 53.01600312774294, lng: 29.0234375},
    {lat: 54.51822185091831, lng: 24.814453125}, 
    {lat: 49.20018618540992, lng: 24.0576171875}, 
    {lat: 51.936842019727436, lng: 32.2314453125},
  ].map(({lat, lng}) => new GeoPoint(lat, lng)));

  @observable borderline?: IndexatedFigure;
  @observable bounds = {
    north: 40,
    south: 30,
    west: 30,
    east: 40
  }

  constructor(props: Props) {
    super(props);

    this.geolocationStore = props.geolocationStore!;
  }

  async componentDidMount() {
    this.geolocationStore.watchPosition();

    this.borderline = await IndexatedFigure.fromShape(this.border, this.params, false);
  }

  componentWillUnmount() {
    this.geolocationStore.unwatchPosition();
  }

  onBorderChange = async (shape: GeoPolygon) => {
    const borderline = await IndexatedFigure.fromShape(shape, this.params, false);

    transaction(() => {
      this.borderline = borderline;
      this.border = shape;
    });
  }

  onCenterClick = (): void => {
    const {mapService} = this.props;
    const {position} = this.geolocationStore;

    if (!position || !mapService) return;

    mapService.panTo(position);
  }

  onClick = (e: google.maps.MouseEvent) => {
    const point = new GeoPoint(
      e.latLng.lat(),
      e.latLng.lng(),
    )

    this.cell = Cell.fromGeoPoint(point, this.params);
    this.point = point;
  }

  render() {
    const {position} = this.geolocationStore;

    if (position === undefined || !this.borderline) return null;

    return (
      <>
        <DumbMap
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
          <EditableBorderline 
            gridParams={this.params}
            border={this.border}
            onPathChange={this.onBorderChange}
          />
          {this.cell && (
            <CellPoly
              cell={this.cell} 
              onClick={this.onClick}
            />
          )}
          {this.borderline && (
            <Polygon 
              paths={this.borderline.fullPoints.points} 
              onClick={this.onClick}
              strokeColor='green'
              fillColor='transparent'
            />
          )}
          {/* {this.area && (
            <SmartPolygon 
              paths={this.area.polys} 
              onClick={this.onClick}
              strokeColor='green'
              fillColor='green'
            />
          )}
          <SmartPolygon 
            paths={[
              [{lat: 50, lng: 100}, {lat: 40, lng: 120}, {lat: 55, lng: 110}],
              [{lat: 50, lng: 105}, {lat: 47, lng: 110}, {lat: 50, lng: 108}]
            ]} 
            onClick={this.onClick}
            strokeColor='green'
            fillColor='green'
          />
          {this.intersetions.map((point, index) => (
            <SmartMarker 
              position={point}
              title={`{lat: ${point.lat}, lng: ${point.lng}}`}
              key={`intersect-${index}`}
            />
          ))}
          {this.connection && (
              <SmartPolyline 
                path={this.connection.path}
                strokeColor={'rgba(50, 0, 200, 0.5)'}
              />
          )}
          {this.nextCells.map((cell, index) => (
            <CellPoly
              cell={cell}
              key={`next-cell-${index}`}
            />
          ))} */}
          <GridOverlay
            params={this.params}
            borderline={this.borderline}
          />
          {this.props.children}
          <PositionMarker />
          {this.point && (
            <Marker
              position={this.point}
              title="lala"
            />
          )}
        </DumbMap>
        <button onClick={this.onCenterClick}>Center</button>
      </>
    );
  }
}

export const PositionMap = withSmartMapCtx<PositionMapProps>(PositionMapWrapped);
