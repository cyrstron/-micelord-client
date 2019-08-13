import classNames from 'classnames/bind';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {GeolocationStore} from '@stores/geolocation';
import {
  DumbMap,
  withSmartMapCtx,
  MapService,
} from '@micelord/maps';

import styles from './position-map.scss';

const cx = classNames.bind(styles);

interface PositionMapProps {
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
  apiKey: string;
}

type Props = PositionMapProps & {
  mapService?: MapService,
}

@inject('geolocationStore')
@observer
export class PositionMapWrapped extends Component<Props> {
  geolocationStore: GeolocationStore;

  constructor(props: Props) {
    super(props);

    this.geolocationStore = props.geolocationStore!;
  }

  componentDidMount() {
    this.geolocationStore.watchPosition();
  }

  componentWillUnmount() {
    this.geolocationStore.unwatchPosition();
  }

  onCenterClick = (): void => {
    const {mapService} = this.props;
    const {position} = this.geolocationStore;

    if (!position || !mapService) return;

    mapService.panTo(position);
  }

  render() {
    const {position} = this.geolocationStore;

    if (position === undefined) return null;

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
        >
          {/* {this.borderline && (
            <SmartMarker position={this.borderline.points[0]} title='point' />
          )}
          {this.cell && (
            <CellPoly 
              cell={this.cell} 
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
          {this.area && (
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
          ))}
          {this.borderline && (
            <GridOverlay 
              params={this.gridParams}
              borderline={this.borderline}
            />
          )}
          <PositionMarker />
          {this.props.children} */}
        </DumbMap>
        <button onClick={this.onCenterClick}>Center</button>
      </>
    );
  }
}

export const PositionMap = withSmartMapCtx<PositionMapProps>(PositionMapWrapped);
