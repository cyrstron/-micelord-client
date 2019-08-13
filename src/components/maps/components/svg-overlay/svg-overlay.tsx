import React, {ReactNode} from 'react';
// import {SmartCustomOverlay} from '@micelord/maps';
// import {utils} from '@micelord/grider';

interface Props {
  children?: ReactNode;
  fill?: string;
  bounds: google.maps.LatLngBoundsLiteral,
}

export const SvgOverlay = ({bounds, children, fill}: Props) => {
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

  return null;

  // return (
  //   <SmartCustomOverlay
  //     bounds={bounds}
  //   >
  //     <svg
  //       xmlns='http://www.w3.org/2000/svg'
  //       width='100%'
  //       height='100%'
  //       strokeOpacity='0'
  //       // viewBox={`0 0 100 ${relHeight}`}
  //       viewBox={`0 0 100 100`}
  //       aria-labelledby='title' 
  //       fill='none'
  //     >
  //       {children}
  //     </svg>
  //   </SmartCustomOverlay>
  // );
};
