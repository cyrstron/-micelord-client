import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { GeoPointStore } from '@scenes/games/stores/point-store';

import styles from './geo-point-control.scss';
import { Input } from '@components/inputs';
import { Button } from '@components/buttons';
import { observer } from 'mobx-react';
import { GeoCoordControl } from './components/geo-coord-control.tsx';

const cx = classnames.bind(styles);

export interface GeoPointControlProps {
  inputStore: GeoPointStore;
  className?: string;
  onApply: () => void;
  onChange?: () => void;
  index: number;
}

@observer
class GeoPointControl extends Component<GeoPointControlProps> {
  onApply = () => {
    const {onApply} = this.props;

    onApply();
  }

  render() {
    const {
      inputStore: {lat, lng},
      index,
      className,
      onChange,
    } = this.props;

    return (
      <div className={cx('point-control', className)}>
        <GeoCoordControl 
          className={cx('lat-control')}
          inputStore={lat}
          title='lat:'
          onChange={onChange}
          isLat
        />
        <GeoCoordControl 
          className={cx('lng-control')}
          inputStore={lng}
          title='lng:'
          onChange={onChange}
        />
      </div>
    )
  }
}

export {GeoPointControl};