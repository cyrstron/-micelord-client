import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {GeolocationStore} from '../../../../stores';
import {SmartMarker} from '../../../maps-objects';

interface MarkerProps {
  geolocationStore?: GeolocationStore;
}

@inject('geolocationStore')
@observer
export class PositionMarker extends Component<MarkerProps> {
  geolocationStore: GeolocationStore;

  constructor(props: MarkerProps) {
    super(props);

    this.geolocationStore = props.geolocationStore!;
  }
  render() {
    const {position} = this.geolocationStore;

    if (position === undefined) return null;

    return (
      <SmartMarker
        title='You are here'
        position={position}
      />
    );
  }
}
