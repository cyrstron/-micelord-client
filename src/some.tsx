import React, { ReactNode } from "react";
import classNames from 'classnames/bind';
import styles from "./container.css";

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
}

const Container = ({children}: Props) => (
  <div className={cx('container')}>
    <div className={cx('inner-container')}>
      {children}
    </div>
    <div className={cx('global-class-name')}>
      {children}
    </div>
  </div>
);

export default Container;


