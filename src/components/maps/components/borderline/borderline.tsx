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

    const {
      grider,
      border
    } = props;

    this.paths = grider.buildInnerFigure(border);
  }
  render() {
    return (
      <SmartPolygon
        paths={this.paths}
        strokeColor='#880000'
        strokeOpacity={0.4}
        fillColor='#880000'
        fillOpacity={0.2}
        strokeWeight={2}
        onClick={this.props.onClick}
      />
    );
  }
}
