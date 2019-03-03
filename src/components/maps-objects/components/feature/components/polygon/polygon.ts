import {observer} from 'mobx-react';
import {Component} from 'react';
import {WrappedProps} from '../../hocs/with-full-feature-ctx';
import {PolygonStore} from './stores';

@observer
export class Polygon extends Component<PolygonProps & WrappedProps<PolygonStore>, {}> {
  componentDidUpdate({
    featureStore: _featureStore,
    ...prevProps
  }: PolygonProps & WrappedProps<PolygonStore>) {
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

    featureStore.setPolygon({
      ...markerOptions,
    });
  }

  render() {
    return null;
  }
}
