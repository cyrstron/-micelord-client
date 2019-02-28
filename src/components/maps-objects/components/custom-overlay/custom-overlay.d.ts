import {CustomOverlayStore} from './stores';
import {ReactNode} from 'react';

export interface CustomOverlayProps extends google.custom.CustomOverlayOptions {
  children?: ReactNode;
}
