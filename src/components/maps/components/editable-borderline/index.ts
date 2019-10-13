import {DumbEditableBorderline, EditableBorderlineProps} from './editable-borderline';
import {withSmartPolylineCtx} from 'react-google-maps-ts';

export const EditableBorderline = withSmartPolylineCtx<EditableBorderlineProps>(DumbEditableBorderline);