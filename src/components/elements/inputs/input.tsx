import React, { InputHTMLAttributes, Component, ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.scss';
import { InputStore } from '@stores/input-store';
import { observer } from 'mobx-react';

const cx = classNames.bind(styles);

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>, 
  'value' | 'onChange' | 'title'
> {
  title: ReactNode;
  className?: string;
  inputStore: InputStore;
}

@observer
export class Input extends Component<InputProps, {}> {
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const {inputStore} = this.props;

    inputStore.setValue(value);
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
        className={cx('input-wrapper', className, {
          'is-invalid': !isValid && isTouched,
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
        <input
          {...props}
          id={id}
          value={value}
          onChange={this.onChange}
          className={cx('input')}
        />
        {error && (
          <span 
            className={cx('error')}
          >
            {error.message}
          </span>
        )}
      </div>
    )
  }
}