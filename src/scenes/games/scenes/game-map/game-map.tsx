import classNames from 'classnames/bind';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {GeolocationStore} from '@stores/geolocation';
import {PositionMarker} from '@components/maps';
import {
  DumbMap,
  withSmartMapCtx,
  MapService,
} from 'react-google-maps-ts';
import styles from './game-map.scss';

const cx = classNames.bind(styles);

interface GameMapProps {
  className?: string;
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
}

type Props = GameMapProps & {
  mapService?: MapService,
}

@inject('geolocationStore')
@observer
export class DumbGameMap extends Component<Props> {
  geolocationStore: GeolocationStore;

  constructor(props: Props) {
    super(props);

    this.geolocationStore = props.geolocationStore!;
  }

  async componentDidMount() {
    this.geolocationStore.watchPosition();
  }

  componentWillUnmount() {
    this.geolocationStore.unwatchPosition();
  }

  render() {
    const {className} = this.props;
    const {position} = this.geolocationStore;

    if (position === undefined) return null;

    return (
        <DumbMap
          className={cx('game-map', className)}
          defaultCenter={position}
          zoom={8}
          clickableIcons={false}
          disableDefaultUI={false}
          gestureHandling='greedy'
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          fullscreenControl={false}
          // onClick={this.onClick}          
        >
          {this.props.children}
          <PositionMarker />
        </DumbMap>
    );
  }
}

export const GameMap = withSmartMapCtx<GameMapProps>(DumbGameMap);
