import {observer} from 'mobx-react';
import { Component } from 'react';
import {WrappedProps} from '../../hocs/with-full-feature-ctx';
import {MarkerStore} from './stores';

@observer
export class Marker extends Component<MarkerProps & WrappedProps<MarkerStore>, {}> {
  componentDidUpdate({
    featureStore: _featureStore,
    ...prevProps
  }: MarkerProps & WrappedProps<MarkerStore>) {
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

    featureStore.setMarker({
      ...markerOptions,
    });
  }

  render() {
    return null;
  }
}
