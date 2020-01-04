import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { GridOverlay } from '@components/maps/components/grid-overlay/grid-overlay';
import { Polyline, MapBroadcaster } from 'react-google-maps-ts';
import { CurrentGameStore } from '@scenes/games/stores/current-game-store';
import { CurrentObject } from './components/current-object';
import { GeoPoint, Cell } from '@micelord/grider';
import { SelectedObject } from './components/selected-object';

interface CurrentGameMapProps {
  currentGameStore?: CurrentGameStore
}

@inject('currentGameStore')
@observer
export class CurrentGameMap extends Component<CurrentGameMapProps> {
  onClick = (e: google.maps.MouseEvent) => {
    const geoPoint = GeoPoint.fromPlain({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    const {currentGameStore} = this.props;

    const {gridParams} = currentGameStore!;

    const cell = Cell.fromGeoPoint(geoPoint, gridParams!);

    currentGameStore!.selectObject(cell);
  }

  render() {
    const {borderFigure, gridParams, isReady} = this.props.currentGameStore!;

    if (!isReady) return null;

    return (
      <>
        {gridParams && (
          <GridOverlay 
            borderline={borderFigure}
            params={gridParams}
          />
        )}
        {gridParams && borderFigure && (
          <Polyline
            path={borderFigure.fullPoints.points}
            strokeColor='#0f0'
          />
        )}
        <MapBroadcaster 
          onClick={this.onClick}
        />
        <CurrentObject 
          onClick={this.onClick}
        />
        <SelectedObject />
      </>
    );
  }
}
