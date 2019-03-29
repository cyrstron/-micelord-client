import React, {ReactNode} from 'react';
import {SmartCustomOverlay} from '@maps/custom-overlay';
import {utils} from '@micelord/grider';

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

  if (east - west > 180) {
    east = utils.geography.reduceLng(east - 180);
    west = utils.geography.reduceLng(west - 180);
  }

  const northMerc = utils.geography.spherLatToMercY(north);
  const southMerc = utils.geography.spherLatToMercY(south);
  const eastMerc = utils.geography.spherLngToMercX(east);
  const westMerc = utils.geography.spherLngToMercX(west);

  const relHeight = (northMerc - southMerc) / (eastMerc - westMerc) * 100;

  return (
    <SmartCustomOverlay
      bounds={bounds}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        viewBox={`0 0 100 ${relHeight}`}
        aria-labelledby='title' 
        fill="blue" 
      >
        <title id='title'>Umbrella Icon</title>
        <pattern 
          patternUnits="userSpaceOnUse"
          id="pattern"
          width="17.32px" 
          height="30px"
        >        
          <line 
            x1="0" 
            x2="8.66px" 
            y1="0" 
            y2="5px" 
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          /> 
          <line 
            x1="17.32px" 
            x2="8.66px" 
            y1="0" 
            y2="5px" 
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          />
          <line 
            x1="8.66px" 
            x2="8.66px" 
            y1="5px" 
            y2="15px" 
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          />
          <line 
            x1="0" 
            x2="8.66px" 
            y1="20px" 
            y2="15px" 
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          /> 
          <line 
            x1="17.32px" 
            x2="8.66px" 
            y1="20px" 
            y2="15px" 
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          />
          <line 
            x1="0" 
            x2="0" 
            y1="20px" 
            y2="30px" 
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          /> 
          <line 
            x1="17.32px" 
            x2="17.32px" 
            y1="20px" 
            y2="30px" 
            stroke="orange"
            strokeWidth="3px"
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
        <rect 
          fill="url(#pattern)" 
          width="100%"
          height="100%"
        />
      </svg>
    </SmartCustomOverlay>
  );
};
