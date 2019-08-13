import React, {Component} from 'react';
// import {DumbPolyline, SmartMarker, PolylineStore} from '@micelord/maps';
import {GeoPolygon, GeoPoint, GridParams} from '@micelord/grider';
import debounce from 'lodash/debounce';

export interface EditableBorderlineProps {
  border: GeoPolygon;
  gridParams: GridParams;
  onPathChange: (newPath: GeoPolygon) => void
}

type Props = EditableBorderlineProps & {
  // featureStore: PolylineStore,
};

export class DumbEditableBorderline extends Component<Props> {
  pathObj: google.maps.MVCArray<google.maps.LatLng> | undefined;
  
  componentDidMount() {
    // const {
    //   featureStore,
    // } = this.props;

    // const pathObj = featureStore.getPathObj();

    // if (!pathObj) return;

    // this.pathObj = pathObj;

    // pathObj.addListener('insert_at', this.onDragBorder);
    // pathObj.addListener('remove_at', this.onDragBorder);
    // pathObj.addListener('set_at', this.onDragBorder);
  }

  componentDidUpdate() {
    // const {
    //   featureStore,
    // } = this.props;

    // const pathObj = featureStore.getPathObj();

    // if (!pathObj || pathObj === this.pathObj) return;

    // pathObj.addListener('insert_at', this.onDragBorder);
    // pathObj.addListener('remove_at', this.onDragBorder);
    // pathObj.addListener('set_at', this.onDragBorder);
  }
  
  onDragBorder: google.maps.MapMouseEventHandler = debounce(() => {
    const {
      // featureStore,
      onPathChange,
      border,
    } = this.props;

    // const path = featureStore.getPath();

    // if (!path) return;

    // const pathExtended = path.map(({lat, lng}) => new GeoPoint(lat, lng));

    // const borderPoints = pathExtended.slice(0, -1);

    // if (!pathExtended[pathExtended.length - 1].isEqual(pathExtended[0])) {
    //   borderPoints[0] = pathExtended[pathExtended.length - 1];
    // }

    // const arePointsChanged = borderPoints.length !== border.points.length || border
    //   .points.reduce((arePointsChanged: boolean, point, index) => {
    //     if (arePointsChanged) return arePointsChanged;
        
    //     return point.isEqual(border.points[index]);
    //   }, false);

    // if (!arePointsChanged) return;

    // const poly = new GeoPolygon(borderPoints)

    // onPathChange(poly);
  }, 500)


  render() {
    const {border, gridParams} = this.props;

    const {selfIntersections} = border;
    // const cells = border.cellsInvalidForFigure(gridParams);

    return (
      <>
        {/* <DumbPolyline
          path={[...border.points, border.points[0]]}
          strokeColor='#000066'
          onDragEnd={this.onDragBorder}
          editable={true}
          draggable={true}
        />
        {selfIntersections.map((point, index) => (
          <SmartMarker position={point} title={`${index}`} key={index} />
        ))} */}
        {/* {cells.map((cell, index) => (
          <SmartPolygon paths={cell.points} key={index} />
        ))} */}
      </>
    );
  }
}