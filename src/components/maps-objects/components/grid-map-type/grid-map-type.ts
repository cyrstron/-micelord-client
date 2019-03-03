import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {GridMapTypeProps} from './types';
import {WrappedProps} from './hocs/with-full-map-type-ctx';
import {GridMapTypeStore} from './stores';

type Props = GridMapTypeProps & WrappedProps<GridMapTypeStore>;

@observer
export class GridMapType extends Component<Props, {}> {
  container?: HTMLDivElement;

  componentDidMount() {
    const {
      mapTypeStore,
      children,
      ...options
    } = this.props;

    if (!mapTypeStore) return;

    mapTypeStore.setGridMapType({
      index: 1,
      width: 256,
    });
  }

  render() {
    return null;
  }
}
