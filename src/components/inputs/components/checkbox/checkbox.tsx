import React, { InputHTMLAttributes, Component, ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames/bind';

import { InputStore } from '@stores/input-store';
import { observer } from 'mobx-react';
import { InputError } from '../input-error/input-error';

import styles from './checkbox.scss';

const cx = classNames.bind(styles);

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>, 
  'value' | 'title' | 'type'
> {
  title: ReactNode;
  className?: string;
  inputStore: InputStore<boolean>;
}

@observer
export class Checkbox extends Component<InputProps, {}> {
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {checked} = e.target;
    const {inputStore, onChange} = this.props;

    inputStore.setValue(checked);

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
        <span className={cx('checkbox-wrapper')}>
          <input
            {...props}
            id={id}
            checked={value}
            onChange={this.onChange}
            className={cx('checkbox')}
            type='checkbox'
          />
        </span>
        <label 
          htmlFor={id}
          className={cx('label')}
        >
          {title}
        </label>
        <InputError 
          className={cx('error')}
          error={error} 
        />
      </div>
    )
  }
}