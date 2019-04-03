import React, {Component} from 'react';
import {DumbPolyline} from '@maps/feature';
import {PolylineStore} from '@maps/feature';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

type Props = EditableBorderlineProps & {
  featureStore: PolylineStore,
};

export class DumbEditableBorderline extends Component<Props> {
  pathObj: google.maps.MVCArray<google.maps.LatLng> | undefined;
  
  componentDidMount() {
    const {
      featureStore,
    } = this.props;

    const pathObj = featureStore.getPathObj();

    if (!pathObj) return;

    this.pathObj = pathObj;

    pathObj.addListener('insert_at', this.onDragBorder);
    pathObj.addListener('remove_at', this.onDragBorder);
    pathObj.addListener('set_at', this.onDragBorder);

    console.log(featureStore.getPath())
  }

  componentDidUpdate() {
    const {
      featureStore,
    } = this.props;

    const pathObj = featureStore.getPathObj();

    if (!pathObj || pathObj === this.pathObj) return;

    pathObj.addListener('insert_at', this.onDragBorder);
    pathObj.addListener('remove_at', this.onDragBorder);
    pathObj.addListener('set_at', this.onDragBorder);

    console.log(featureStore.getPath())
  }
  
  onDragBorder: google.maps.MapMouseEventHandler = debounce(() => {
    const {
      featureStore,
      onPathChange,
      border,
    } = this.props;

    const path = featureStore.getPath();

    if (!path) return;

    const borderPoints = path.slice(0, -1);

    if (!isEqual(path[path.length - 1], path[0])) {
      borderPoints[0] = path[path.length - 1];
    }

    const arePointsChanged = borderPoints.length !== border.length || 
    borderPoints.reduce((arePointsChanged, point, index) => {
      if (arePointsChanged) return arePointsChanged;
      
      return !isEqual(point, border[index]);
    }, false);

    if (!arePointsChanged) return;

    onPathChange(borderPoints);
  }, 500)


  render() {
    const {border} = this.props;

    return (
      <DumbPolyline
        path={[...border, border[0]]}
        strokeColor='#000066'
        onDragEnd={this.onDragBorder}
        editable={true}
        draggable={true}
      />
    );
  }
}