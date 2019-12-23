import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { GridOverlay } from '@components/maps/components/grid-overlay/grid-overlay';
import { NewGameStore } from '@scenes/games/stores/new-game-store';
import { Switch, Route } from 'react-router';
import { BorderlineSetter } from './components/borderline-setter/borderline-setter';
import { Polyline } from 'react-google-maps-ts';

interface NewGameMapProps {
  newGameStore?: NewGameStore
}

@inject('newGameStore')
@observer
export class NewGameMap extends Component<NewGameMapProps> {
  render() {
    const {gridParams, borderFigure} = this.props.newGameStore!

    return (
      <>
        <Switch>
          <Route 
            path='/games/new/border'
            component={BorderlineSetter}
          />
        </Switch>
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
      </>
    );
  }
}
