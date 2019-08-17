import React, {Component} from 'react';
import {DumbPolyline, Marker, PolylineService} from '@micelord/maps';
import {GeoPolygon, GeoPoint, GridParams, Figure} from '@micelord/grider';
import debounce from 'lodash/debounce';

export interface EditableBorderlineProps {
  border: GeoPolygon;
  gridParams: GridParams;
  onPathChange: (newPath: GeoPolygon) => void
}

type Props = EditableBorderlineProps & {
  featureService?: PolylineService,
};

export class DumbEditableBorderline extends Component<Props> {
  pathObj: google.maps.MVCArray<google.maps.LatLng> | undefined;
  
  componentDidMount() {
    const {
      featureService,
    } = this.props;

    if (!featureService) return;

    const pathObj = featureService.object.getPath();

    this.pathObj = pathObj;

    pathObj.addListener('insert_at', this.onDragBorder);
    pathObj.addListener('remove_at', this.onDragBorder);
    pathObj.addListener('set_at', this.onDragBorder);
  }

  componentDidUpdate() {
    const {
      featureService,
    } = this.props;

    if (!featureService) return;

    const pathObj = featureService.object.getPath();

    if (pathObj === this.pathObj) return;

    pathObj.addListener('insert_at', this.onDragBorder);
    pathObj.addListener('remove_at', this.onDragBorder);
    pathObj.addListener('set_at', this.onDragBorder);
  }
  
  onDragBorder: google.maps.MapMouseEventHandler = debounce(() => {
    const {
      featureService,
      onPathChange,
      border,
    } = this.props;
    
    if (!featureService) return;

    const path = featureService.object.getPath();

    const pathExtended = path.getArray().map((latLng) => new GeoPoint(
      latLng.lat(), 
      latLng.lng(),
    ));

    const borderPoints = pathExtended.slice(0, -1);

    if (!pathExtended[pathExtended.length - 1].isEqual(pathExtended[0])) {
      borderPoints[0] = pathExtended[pathExtended.length - 1];
    }

    const arePointsChanged = borderPoints.length !== border.points.length || border
      .points.reduce((arePointsChanged: boolean, point, index) => {
        if (arePointsChanged) return arePointsChanged;
        
        return point.isEqual(border.points[index]);
      }, false);

    if (!arePointsChanged) return;

    const poly = new GeoPolygon(borderPoints)

    onPathChange(poly);
  }, 500)


  render() {
    const {border, gridParams} = this.props;

    const {selfIntersections} = border;
    // const cells =.cellsInvalidForFigure(gridParams);

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