import {DumbEditableBorderline} from './editable-borderline';
import {withSmartPolylineCtx} from '@maps/feature';

export const EditableBorderline = withSmartPolylineCtx<EditableBorderlineProps>(DumbEditableBorderline);