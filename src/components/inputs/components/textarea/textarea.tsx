import React, { 
  TextareaHTMLAttributes, 
  Component, 
  ChangeEvent, 
  ReactNode 
} from 'react';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';

import { InputStore } from '@stores/input-store';

import styles from './textarea.scss';
import { InputError } from '../input-error/input-error';

const cx = classNames.bind(styles);

export interface TextareaProps extends Omit<
TextareaHTMLAttributes<HTMLTextAreaElement>, 
  'value' | 'title'
> {
  title: ReactNode;
  className?: string;
  inputStore: InputStore;
}

@observer
export class Textarea extends Component<TextareaProps, {}> {
  onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        <span className={cx('textarea-wrapper')}>
          <textarea
            {...props}
            id={id}
            value={value}
            onChange={this.onChange}
            className={cx('textarea')}
          />
        </span>
        <InputError 
          error={error} 
          className={cx('error')}
        />
      </div>
    );
  }
}