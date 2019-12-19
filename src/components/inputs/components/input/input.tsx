import React, { InputHTMLAttributes, Component, ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './input.scss';
import { InputStore } from '@stores/input-store';
import { observer } from 'mobx-react';
import { InputError } from '../input-error/input-error';

const cx = classNames.bind(styles);

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>, 
  'value' | 'title'
> {
  title: ReactNode;
  className?: string;
  inputStore: InputStore<any>;
}

@observer
export class Input extends Component<InputProps, {}> {
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const {inputStore, onChange} = this.props;

    inputStore.setValue(value);

    onChange && onChange(e);
  }

  render() {
    const {
      className,
      inputStore: {
        value,
        isValid,
        isTouched,
        isPending,
        error,
      },
      id,
      title,
      ...props
    } = this.props;
  
    return (
      <div      
        className={cx('control', className, {
          'is-invalid': isValid === false,
          'is-valid': isValid && isTouched,
          'is-pending': isPending,
        })}
      >
        <label 
          htmlFor={id}
          className={cx('label')}
        >
          {title}
        </label>
        <span className={cx('input-wrapper')}>
          <input
            {...props}
            id={id}
            value={value}
            onChange={this.onChange}
            className={cx('input')}
          />
        </span>
        <InputError 
          className={cx('error')}
          error={error} 
        />
      </div>
    )
  }
}