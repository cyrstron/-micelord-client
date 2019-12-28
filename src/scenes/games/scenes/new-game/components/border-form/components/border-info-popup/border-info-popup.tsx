import React from 'react';
import classnames from 'classnames/bind';
import { Popup } from '@components/popup';

import styles from './border-info-popup.scss';

const cx = classnames.bind(styles);

interface BorderInfoPopupProps {
  closePopup: () => void;
  className?: string;
}

const BorderInfoPopup = ({
  closePopup,
  className,
}: BorderInfoPopupProps) => {

  return (
    <Popup
      closePopup={closePopup}
      title='Border editor hotkeys'
      className={cx('popup', className)}
    >
        <p>Right click on map - add new point.</p>
        <p>Left click on map - edit selected point.</p>
        <p>Drag point - edit point position.</p>
        <p>Right click on point - delete point.</p>
    </Popup>
  )
}

export {BorderInfoPopup}
