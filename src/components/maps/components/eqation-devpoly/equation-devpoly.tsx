import React, {Component} from 'react';
import {SmartPolyline, SmartPolygon} from '@maps/feature';
import {StaticGrider, utils} from '@micelord/grider';

interface Props {
  grider: StaticGrider;
  border: google.maps.LatLngLiteral[];
  onClick?: google.maps.MapPolyEventHandler;
}

export class EqDevpoly extends Component<Props> {
  utils = utils;
  paths: google.maps.LatLngLiteral[];

  constructor(props: Props) {
    super(props);

    this.paths = [...this.props.border, this.props.border[0]];
  }
  render() {
    const lngPoly = this.props.border.reduce((
      poly: google.maps.LatLngLiteral[],
      point: google.maps.LatLngLiteral,
      index: number,
    ): google.maps.LatLngLiteral[] => {
      const nextPoint = this.props.border[index + 1] || this.props.border[0];

      const latStep = (point.lat - nextPoint.lat) / 5;

      for (let mul = 0; mul < 5; mul += 1) {
        const nextLat = point.lat + latStep * mul;

        poly.push({
          lat: nextLat,
          lng: this.utils.geography.calcLngByLatOnLox(nextLat, [point, nextPoint])
        });
      }

      return poly;
    }, []);

    const latPoly = this.props.border.reduce((
      poly: google.maps.LatLngLiteral[],
      point: google.maps.LatLngLiteral,
      index: number,
    ): google.maps.LatLngLiteral[] => {
      const nextPoint = this.props.border[index + 1] || this.props.border[0];

      const lngStep = (point.lng - nextPoint.lng) / 5;

      for (let mul = 0; mul < 5; mul += 1) {
        const nextLng = point.lng + lngStep * mul;

        poly.push({
          lat: nextLng,
          lng: this.utils.geography.calcLatByLngOnLox(nextLng, [point, nextPoint])
        });
      }

      return poly;
    }, []);
    // const paths = this.props.grider.buildInnerFigure(border);

    return ([
      // <SmartPolygon
      //   paths={lngPoly}
      //   strokeColor='#660000'
      //   strokeWeight={2}
      //   onClick={this.props.onClick}
      // />,
      <SmartPolygon
        paths={latPoly}
        strokeColor='#000066'
        strokeWeight={2}
        onClick={this.props.onClick}
      />
    ]);
  }
}
