import React, {Component} from 'react';
import {SmartPolygon} from '@maps/feature';
import {StaticGrider} from '@micelord/grider';

interface Props {
  grider: StaticGrider;
  border: google.maps.LatLngLiteral[];
}

export class Borderline extends Component<Props> {
  render() {

    // const paths = this.props.grider.buildInnerFigure(border);

    return (
      <SmartPolygon
        paths={this.props.border}
      />
    );
  }
}
