import React, {Component} from 'react';
import {SmartPolyline, SmartMarker, SmartPolygon} from '@maps/feature';
import {StaticGrider} from '@micelord/grider';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface Props {
  grider: StaticGrider;
  border: google.maps.LatLngLiteral[];
  borderline: google.maps.LatLngLiteral[];
  setBorderline: (borderline: google.maps.LatLngLiteral[]) => void,
  outer?: boolean;
  onClick?: google.maps.MapPolyEventHandler;
}

@observer
export class Borderline extends Component<Props> {
  @observable selfIntersects: google.maps.LatLngLiteral[] = [];
  @observable closeCells: google.maps.LatLngLiteral[][] = [];

  constructor(props: Props) {
    super(props);

    this.updatePath();
  }

  componentDidUpdate(prevProps: Props) {
    const {
      border,
    } = this.props;

    if (prevProps.border === border) return;

    this.updatePath();
  }

  private updatePath() {
    const {
      grider,
      border,
      outer,
      setBorderline,
    } = this.props;

    const shape = [...border];

    console.log(shape)

    this.selfIntersects = grider.figureBuilder.validator.getSelfIntersectsPoints(shape);
    this.closeCells = grider.figureBuilder.validator.getTooCloseCells(shape, grider.params);

    const borderline = grider.buildFigure(shape, !outer);

    setBorderline(borderline)
  }

  render() {
    const {borderline} = this.props;
    if (this.selfIntersects.length > 0) {
      return this.selfIntersects.map((intersect) => (
        <SmartMarker 
          position={intersect}
          title="Invalid intersecion!"
        />
      ))
    }

    if (this.closeCells.length > 0) {
      return this.closeCells.map((cell) => (
        <SmartPolygon 
          paths={cell}
          strokeColor='#aa0000'
          strokeOpacity={0.6}
          fillColor='#aa0000'
          fillOpacity={0.2}
        />
      ))
    }

    return (      
      <SmartPolyline
        path={borderline}
        strokeColor='#880000'
        strokeWeight={3}
      />
    );
  }
}
