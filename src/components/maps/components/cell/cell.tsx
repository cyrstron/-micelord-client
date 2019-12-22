import React from 'react';
import {SvgOverlay} from '../svg-overlay/svg-overlay';
import {Polygon} from 'react-google-maps-ts';
import { Cell } from '@micelord/grider';

const CellPoly = ({
  onClick,
  cell: {
    center: {i, j, k},
    points,
    northernPoint,
    easternPoint,
    westernPoint,
    southernPoint,
}}: {
  cell: Cell,
  onClick: google.maps.MapMouseEventHandler
}) => (
  <>
    <SvgOverlay
      bounds={{
        north: northernPoint.lat + (northernPoint.lat - southernPoint.lat),
        east: easternPoint.lng,
        west: westernPoint.lng,
        south: northernPoint.lat,
      }}
    >
      <text 
        x={'50%'} 
        y={'50%'} 
        textAnchor='middle'
        fontSize='10px'
        fontWeight='bold'
        stroke='#fff'
        fill='#000'
      >
        {'{'}i: {i}, j: {j}, k: {k}{'}'}
      </text>
    </SvgOverlay>
    <Polygon 
      paths={points} 
      fillColor='transparent'
      onClick={onClick}
    />
  </>
);

export {CellPoly};