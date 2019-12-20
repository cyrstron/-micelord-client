import classNames from 'classnames/bind';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {GeolocationStore} from '@stores/geolocation';
import {PositionMarker} from '@components/maps';
import {
  DumbMap,
  MapService,
} from 'react-google-maps-ts';
import styles from './games-map.scss';

const cx = classNames.bind(styles);

interface GamesMapProps {
  className?: string;
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
}

type Props = GamesMapProps & {
  mapService?: MapService,
}

@inject('geolocationStore')
@observer
export class GamesMap extends Component<Props> {
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
          zoom={16}
          clickableIcons={false}
          disableDefaultUI={false}
          gestureHandling='greedy'
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          fullscreenControl={false}       
        >
          {this.props.children}
          <PositionMarker />
        </DumbMap>
    );
  }
}

