import React, {Component} from 'react';
import {SmartPolygon} from '@maps/feature';
import {StaticGrider} from '@micelord/grider';

interface Props {
  grider: StaticGrider
}

export class Borderline extends Component<Props> {
  render() {
    const border = [{
      lat: 55,
      lng: 30,
    }, {
      lat: 50,
      lng: 35,
    }, {
      lat: 55,
      lng: 40,
    }, {
      lat: 60,
      lng: 35,
    }];

    const paths = this.props.grider.buildInnerFigure(border);

    return (
      <SmartPolygon
        paths={paths}
      />
    );
  }
}
