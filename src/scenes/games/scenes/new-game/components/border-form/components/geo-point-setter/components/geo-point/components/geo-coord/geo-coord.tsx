import React, { ReactNode } from 'react';
import classnames from 'classnames/bind';
import { fromDec } from '../../../../services/format-coord';

import styles from './geo-coord.scss';

const cx = classnames.bind(styles);

export interface GeoCoordProps {
  value: number;
  title: ReactNode;
  className?: string;
}

const GeoCoord = ({
  value, 
  title, 
  className
}: GeoCoordProps) => {
  const {
    isPositive,
    deg,
    min,
    sec,
  } = fromDec(value);

  return (
    <div className={cx('geo-coord', className)}>
      {title}
      <div className={cx('coord-wrapper')}>
        {!isPositive && (
          <span className={cx('minus')}>-</span>
        )}
        <span className={cx('deg')}>{deg}°</span>
        <span className={cx('min')}>{min}'</span>
        <span className={cx('desecg')}>{sec.toFixed(1)}"</span>
      </div>
    </div>
  );
}

export {GeoCoord};