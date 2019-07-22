import React, {ReactNode} from 'react';
import {SmartCustomOverlay} from '@maps/custom-overlay';
// import {utils} from '@micelord/grider';

interface Props {
  children?: ReactNode;
  bounds: google.maps.LatLngBoundsLiteral,
}

export const SvgOverlay = ({bounds}: Props) => {
  let {
    east,
    west,
    north,
    south
  } = bounds;

  // if (east - west > 180) {
  //   east = utils.geography.reduceLng(east - 180);
  //   west = utils.geography.reduceLng(west - 180);
  // }

  // const northMerc = utils.geography.spherLatToMercY(north);
  // const southMerc = utils.geography.spherLatToMercY(south);
  // const eastMerc = utils.geography.spherLngToMercX(east);
  // const westMerc = utils.geography.spherLngToMercX(west);

  // const relHeight = (northMerc - southMerc) / (eastMerc - westMerc) * 100;

  return (
    <SmartCustomOverlay
      bounds={bounds}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        // viewBox={`0 0 100 ${relHeight}`}
        viewBox={`0 0 100 100`}
        aria-labelledby='title' 
        fill="blue" 
      >
        <pattern 
          // patternUnits="userSpaceOnUse"
          id="pattern"
          width="10%" 
          height="10%"
        >        
          <rect 
            fill="#666600" 
            width="100%"
            height="100%"
          />
          <polyline 
            points='0,11 11,0'
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          /> 
        </pattern>
        <rect 
          fill="url(#pattern)" 
          x="-10"
          y="-10"
          width="calc(100% + 10px)"
          height="calc(100% + 10px)"
          // width="100%"
          // height="100%"
        />
      </svg>
    </SmartCustomOverlay>
  );
};
