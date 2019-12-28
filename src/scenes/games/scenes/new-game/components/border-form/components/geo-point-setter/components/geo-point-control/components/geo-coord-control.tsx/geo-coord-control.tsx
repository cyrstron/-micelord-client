import React, { 
  ReactNode, 
  Component, 
  createRef,
  RefObject,
} from 'react';
import classnames from 'classnames/bind';
import { observable } from 'mobx';
import { InputStore } from '@stores/input-store';
import { fromDec, toDec } from '../../../../services/format-coord';

import styles from './geo-coord-control.scss';
import { observer } from 'mobx-react';
import { InputError } from '@components/inputs/components/input-error/input-error';

const cx = classnames.bind(styles);

export interface GeoCoordProps {
  inputStore: InputStore<number>;
  title: ReactNode;
  className?: string;
  isLat?: boolean;
  onChange?: () => void;
}

@observer
class GeoCoordControl extends Component<GeoCoordProps> {
  @observable error?: Error;

  degRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  minRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  secRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  onChange = () => {
    const degInput = this.degRef.current;
    const minInput = this.minRef.current;
    const secInput = this.secRef.current;

    if (!degInput || !minInput || !secInput) return;

    const deg = +degInput.value;
    const min = +minInput.value;
    const sec = +secInput.value;

    try {
      this.validateDeg(deg);
      this.validateMin(min);
      this.validateSec(sec);
    } catch (err) {
      this.error = err;
    }

    this.error = undefined;

    const value = toDec({
      isPositive: deg >= 0,
      deg: Math.abs(deg),
      min,
      sec,
    });

    const {
      inputStore,
      onChange
    } = this.props;

    if (value.toFixed(9) === inputStore.value.toFixed(9)) return;

    inputStore.setValue(value);

    if (!onChange) return;

    onChange();
  }

  validateDeg(value: number) {
    const {isLat} = this.props;
    
    if (value % 1 !== 0) {
      throw new Error('Degrees should be integer');
    }

    if (isLat && value > 90) {
      throw new Error('Latitude can\'t be bigger than 90°');
    } else if (isLat && value < -90) {      
      throw new Error('Latitude can\'t be less than -90°');
    } else if (value > 180) {
      throw new Error('Longitude can\'t be bigger than 180°');
    } else if (value < -180) {
      throw new Error('Longitude can\'t be less than -180°');
    }
  }

  validateMin(value: number) {
    const degInput = this.degRef.current;

    if (!degInput) return;

    const deg = +degInput.value;
    const {isLat} = this.props;

    if (value % 1 !== 0) {
      throw new Error('Minutes should be integer');
    }

    if (value < 0) {
      throw new Error('Minutes can\'t be less than 0');
    }

    if (value >= 60) {
      throw new Error('Minutes should be less than 60');
    }

    if (value === 0) return;

    if (isLat && deg === 90) {
      throw new Error('Latitude can\'t be bigger than 90°');
    } else if (isLat && deg === - 90) {      
      throw new Error('Latitude can\'t be less than -90°');
    } else if (deg === 180) {
      throw new Error('Longitude can\'t be bigger than 180°');
    } else if (deg === -180) {
      throw new Error('Longitude can\'t be less than -180°');
    }
  }

  validateSec(value: number) {
    const degInput = this.degRef.current;

    if (!degInput) return;

    const deg = +degInput.value;
    const {isLat} = this.props;

    if (value < 0) {
      throw new Error('Seconds can\'t be less than 0');
    }

    if (value >= 60) {
      throw new Error('Seconds should be less than 60');
    }

    if (value === 0) return;

    if (isLat && deg === 90) {
      throw new Error('Latitude can\'t be bigger than 90°');
    } else if (isLat && deg === - 90) {      
      throw new Error('Latitude can\'t be less than -90°');
    } else if (deg === 180) {
      throw new Error('Longitude can\'t be bigger than 180°');
    } else if (deg === -180) {
      throw new Error('Longitude can\'t be less than -180°');
    }
  }

  render() {
    const {
      inputStore,
      title,
      className,
      isLat,
    } = this.props;

    const {
      isPositive,
      deg,
      min,
      sec,
    } = fromDec(inputStore.value);

    const minDeg = isLat ? -90 : -180;
    const maxDeg = isLat ? 90 : 180;

    const isDegOnLimit = deg === minDeg || deg === maxDeg;
    const error = inputStore.error || this.error;

    return (
      <div className={cx('geo-coord-control', className)}>
        {title}
        <div 
          className={cx('control-wrapper', {
            'is-invalid': error,
            'is-valid': inputStore.isValid,
          })}
        >
          <label className={cx('deg-control')}>
            <input 
              ref={this.degRef}
              className={cx('deg-input')} 
              type="number"
              name='deg'
              onChange={this.onChange}
              value={deg * (isPositive ? 1 : -1)}
              step="1"
              min={minDeg}
              max={maxDeg}
            />
            °
          </label>
          <label className={cx('min-control')}>
            <input 
              ref={this.minRef}
              className={cx('min-input')} 
              type="number"
              name='min'
              onChange={this.onChange}
              value={min}
              step="1"
              min={0}
              max={isDegOnLimit ? 0 : 59}
            />
            '
          </label>
          <label className={cx('sec-control')}>
            <input 
              ref={this.secRef}
              className={cx('sec-input')} 
              type="number"
              onChange={this.onChange}
              value={sec}
              name='sec'
              step="0.0001"
              min={0}
              max={isDegOnLimit ? 0 : 60}
            />
            "
          </label>
        </div>
        {error && (
          <InputError 
            error={error} 
            className={cx('error')}
          />
        )}
      </div>
    );
  }
}

export {GeoCoordControl};