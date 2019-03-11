import {observer} from 'mobx-react';
import {Component} from 'react';
import {WrappedProps} from '../../hocs/with-full-feature-ctx';
import {PolylineStore} from './stores';

@observer
export class Polyline extends Component<PolylineProps & WrappedProps<PolylineStore>, {}> {
  componentDidUpdate({
    featureStore: _featureStore,
    ...prevProps
  }: PolylineProps & WrappedProps<PolylineStore>) {
    const {
      featureStore,
      ...props
    } = this.props;

    featureStore.updateOptions(prevProps, props);
  }

  componentDidMount() {
    const {
      featureStore,
      ...markerOptions
    } = this.props;

    featureStore.setPolyline({
      ...markerOptions,
    });
  }

  render() {
    return null;
  }
}
