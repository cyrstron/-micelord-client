import React, {Component} from 'react';
import {SmartPolyline, SmartPolygon} from '@maps/feature';
import {StaticGrider} from '@micelord/grider';

interface Props {
  grider: StaticGrider;
  border: google.maps.LatLngLiteral[];
  onClick?: google.maps.MapPolyEventHandler;
}

export class Borderline extends Component<Props> {
  paths: google.maps.LatLngLiteral[];

  constructor(props: Props) {
    super(props);

    this.paths = [...this.props.border, this.props.border[0]];
  }
  render() {

    // const paths = this.props.grider.buildInnerFigure(border);

    return (
      <SmartPolygon
        paths={this.paths}
        strokeColor='#000'
        strokeWeight={2}
        onClick={this.props.onClick}
      />
    );
  }
}
