import React, { Component, ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import { InputStore } from '@stores/input-store';
import { observer } from 'mobx-react';
import { InputError } from '../input-error/input-error';

import styles from './select.scss';

const cx = classNames.bind(styles);

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>, 
  'value' | 'title'
> {
  title: ReactNode;
  className?: string;
  inputStore: InputStore<any>;
  children: ReactNode;
}

@observer
export class Select extends Component<SelectProps, {}> {
  onChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
      children,
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
        <span className={cx('select-wrapper')}>
          <select
            {...props}
            id={id}
            value={value}
            onChange={this.onChange}
            className={cx('select')}
          >
            {children}
          </select>
        </span>
        <InputError 
          className={cx('error')}
          error={error} 
        />
      </div>
    )
  }
}