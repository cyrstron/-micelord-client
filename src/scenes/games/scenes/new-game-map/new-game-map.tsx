import React from 'react';
import { GridOverlay } from '@components/maps/components/grid-overlay/grid-overlay';
import { GridParams } from '@micelord/grider';

export const NewGameMap = () => {
  const gridParams = GridParams.fromConfig({
    type: 'hex',
    correction: 'merc',
    cellSize: 10000,
  });

  return (
    <>
      <GridOverlay 
        params={gridParams}
      />
    </>
  )
}