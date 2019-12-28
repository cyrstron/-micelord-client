import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { observer } from 'mobx-react';
import { Button } from '@components/buttons';

import styles from './geo-point.scss';
import { GeoCoord } from './components/geo-coord/geo-coord';

const cx = classnames.bind(styles);

export interface GeoPointProps {
  point: grider.GeoPoint;
  className?: string;
  isValid: boolean;
  onEdit: (pointIndex: number) => void;
  index: number;
}

@observer
class GeoPoint extends Component<GeoPointProps> {
  onEdit = () => {
    const {index, onEdit} = this.props;

    onEdit(index);
  }

  render() {
    const {
      point: {lat, lng},
      className,
      isValid,
    } = this.props;

    return (
      <div 
        className={cx('geo-point', className, {
          'is-invalid': !isValid,
        })}
      >
        <GeoCoord 
          value={lat} 
          title='lat:' 
          className={cx('coord')}
        />
        <GeoCoord 
          value={lng}
          title='lng:'
          className={cx('coord')}
        />
      </div>
    )
  }
}

export {GeoPoint};