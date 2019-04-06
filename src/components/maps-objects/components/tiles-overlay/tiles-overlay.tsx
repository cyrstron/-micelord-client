import { createPortal } from 'react-dom';
import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {TilesOverlayProps} from './types';
import {WrappedProps} from './hocs/with-full-tiles-overlay-ctx';
import {TilesOverlayStore} from './stores';

type Props = TilesOverlayProps & WrappedProps<TilesOverlayStore>;

@observer
export class TilesOverlay extends Component<Props, {}> {
  registerTile = (
    node: Node, 
    payload: {
      tileCoord: google.maps.Point,
      zoom: number,
    }
  ) => {
    const {
      overlayStore,
    } = this.props;

    overlayStore.registerTile(node, payload);
  }

  unregisterTile = (node: Node) => {
    const {
      overlayStore,
    } = this.props;

    overlayStore.unregisterTile(node);
  }

  componentDidMount() {
    const {
      overlayStore,
      children,
      ...options
    } = this.props;

    if (!overlayStore) return;

    overlayStore.setOverlay({
      index: 1,
      width: 512,
      registerTile: this.registerTile,
      unregisterTile: this.unregisterTile,
    });
  }

  render() {
    const {
      overlayStore,
      TileComponent,
      children,
    } = this.props;
    const tiles = [...overlayStore.tiles.keys()];  
    
    return tiles.map((tile) => {
      const payload = overlayStore.tiles.get(tile);

      if (children && payload) {
        return createPortal((
          children(payload)
        ), tile as Element)
      } else if (TileComponent && payload) {
        return createPortal((
          <TileComponent {...payload}/>
        ), tile as Element)
      } else {
        return null;
      }
    })
  }
}
