import React, {Component} from 'react';
// import {SmartPolyline, SmartPolygon} from '@micelord/maps';
// import {StaticGrider, utils} from '@micelord/grider';

interface Props {
  // grider: StaticGrider;
  border: google.maps.LatLngLiteral[];
  onClick?: google.maps.MapPolyEventHandler;
}

export class EqDevpoly extends Component<Props> {
  // utils = utils;
  paths: google.maps.LatLngLiteral[];

  constructor(props: Props) {
    super(props);

    this.paths = [...this.props.border, this.props.border[0]];
  }
  render() {
    const divider = 10;
    const lngPoly = this.props.border.reduce((
      poly: google.maps.LatLngLiteral[],
      point: google.maps.LatLngLiteral,
      index: number,
    ): google.maps.LatLngLiteral[] => {
      const nextPoint = this.props.border[index + 1] || this.props.border[0];

      const latStep = (point.lat - nextPoint.lat) / 10;

      if (latStep === 0) {
        const lngStep = (point.lng - nextPoint.lng) / 10;
   
        // const equationY = this.utils.geography.calcLatLoxEquation([
        //   point, 
        //   nextPoint
        // ]);

        for (let mul = 0; mul < 10; mul += 1) {
          const nextLng = point.lng - lngStep * mul;

          // const lat = equationY(nextLng);

          // if (!lat) continue;

          // poly.push({
          //   lng: nextLng,
          //   lat,
          // });
        }

      } else {        
        // const equationX = this.utils.geography.calcLngLoxEquation([
        //   point,
        //   nextPoint
        // ])

        for (let mul = 0; mul < 10; mul += 1) {
          const nextLat = point.lat - latStep * mul;

          // const lng = equationX(nextLat);

          // if (lng !== undefined) {
          //   poly.push({
          //     lng,
          //     lat: nextLat
          //   });
          // }
        }
      }

      return poly;
    }, []);

    const strictPoly = this.props.border.reduce((
      poly: google.maps.LatLngLiteral[],
      point: google.maps.LatLngLiteral,
      index: number,
    ): google.maps.LatLngLiteral[] => {
      const nextPoint = this.props.border[index + 1] || this.props.border[0];

      const latStep = (point.lat - nextPoint.lat) / 10;

      if (latStep === 0) {
        const lngStep = (point.lng - nextPoint.lng) / 10;
   
        // const equationY = this.utils.geometry.calcYLineEquation([
        //   [point.lng, point.lat], 
        //   [nextPoint.lng, nextPoint.lat]
        // ]);

        for (let mul = 0; mul < 10; mul += 1) {
          const nextLng = point.lng - lngStep * mul;

          // const lat = equationY(nextLng);

          // if (!lat) continue;

          // poly.push({
          //   lng: nextLng,
          //   lat,
          // });
        }

      } else {        
        // const equationX = this.utils.geometry.calcXLineEquation([
        //   [point.lng, point.lat], 
        //   [nextPoint.lng, nextPoint.lat]
        // ])

        for (let mul = 0; mul < 10; mul += 1) {
          const nextLat = point.lat - latStep * mul;

          // const lng = equationX(nextLat);

          // if (lng !== undefined) {
          //   poly.push({
          //     lng,
          //     lat: nextLat
          //   });
          // }
        }
      }


      return poly;
    }, []);

    return ([
      // <SmartPolygon
      //   key="lngPoly"
      //   paths={lngPoly}
      //   strokeColor='#660000'
      //   strokeWeight={2}
      //   onClick={this.props.onClick}
      // />,
      // <SmartPolygon
      //   key="strictPoly"
      //   paths={strictPoly}
      //   strokeColor='#660066'
      //   strokeWeight={2}
      //   onClick={this.props.onClick}
      //   zIndex={-1}
      // />
    ]);
  }
}
