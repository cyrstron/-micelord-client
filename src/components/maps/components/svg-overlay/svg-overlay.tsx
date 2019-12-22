import React, {ReactNode} from 'react';
import {DomOverlay} from 'react-google-maps-ts';
import {GeoPoint} from '@micelord/grider';

interface Props {
  children?: ReactNode;
  fill?: string;
  bounds: google.maps.LatLngBoundsLiteral,
}

const SvgOverlay = ({bounds, children, fill}: Props) => {
  let {
    east,
    west,
    north,
    south
  } = bounds;

  let northWest = new GeoPoint(north, west);
  let southEast = new GeoPoint(south, east);

  if (east - west > 180) {
    northWest = northWest.toOppositeHemisphere();
    southEast = southEast.toOppositeHemisphere();
  }

  const {x: westX, y: northY} = northWest.toMerc();
  const {x: eastX, y: southY} = southEast.toMerc();

  const relHeight = (southY - northY) / (eastX - westX) * 100;

  return (
    <DomOverlay
      bounds={bounds}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        strokeOpacity='0'
        viewBox={`0 0 100 ${relHeight}`}
        aria-labelledby='title' 
        fill='none'
      >
        {children}
      </svg>
    </DomOverlay>
  );
};

export {SvgOverlay};
