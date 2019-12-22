import {BorderForm as BorderFormComponent, BorderFormProps} from './border-form';
import { withDumbMapCtx } from 'react-google-maps-ts';

const BorderForm = withDumbMapCtx<BorderFormProps>(BorderFormComponent);

export {BorderForm};