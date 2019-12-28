import React, { useContext, ReactNode, useEffect, MouseEvent } from 'react';
import classnames from 'classnames/bind';
import { PopupContext } from '../../app';
import { createPortal } from 'react-dom';

import styles from './popup.scss';
import { DangerIconBtn } from '@components/buttons';

const cx = classnames.bind(styles);

interface PopupProps {
  closePopup: () => void;
  children: ReactNode;
  className?: string;
  title: ReactNode;
}

const stopPropagationHandler = (e: MouseEvent) => {
  e.nativeEvent.stopImmediatePropagation();
  e.stopPropagation();
  e.preventDefault();
}

const Popup = ({
  children,
  closePopup,
  title,
  className,
}: PopupProps) => {
  const popupContainer = useContext(PopupContext);

  useEffect(() => {
    if (!popupContainer) return;

    document.addEventListener('click', closePopup);

    return () => {
      document.removeEventListener('click', closePopup);
    }
  }, []);

  if (!popupContainer) return null;

  return createPortal((
    <div
      onClick={stopPropagationHandler}
      className={cx('popup', className)}
    >
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>
          {title}
          <DangerIconBtn 
            onClick={closePopup}
            className={cx('close-btn')}
          >
            X
          </DangerIconBtn>
        </h2>
        {children}
      </div>
    </div>
  ), popupContainer);
}

export {Popup}