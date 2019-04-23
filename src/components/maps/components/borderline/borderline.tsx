import React, {Component} from 'react';
import {SmartPolyline, SmartMarker, SmartPolygon} from '@maps/feature';
import {StaticGrider, createBorderRenderer, BorderRenderer} from '@micelord/grider';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface Props {
  grider: StaticGrider;
  border: google.maps.LatLngLiteral[];
  outer?: boolean;
  onClick?: google.maps.MapPolyEventHandler;
}

@observer
export class Borderline extends Component<Props> {
  @observable path: google.maps.LatLngLiteral[] = [];
  @observable simplePath: google.maps.LatLngLiteral[] = [];
  @observable selfIntersects: google.maps.LatLngLiteral[] = [];
  @observable closeCells: google.maps.LatLngLiteral[][] = [];
  borderRenderer: BorderRenderer;

  constructor(props: Props) {
    super(props);

    this.borderRenderer = createBorderRenderer(this.path, props.border);

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
    } = this.props;

    const shape = [...border];

    console.log(shape)

    this.selfIntersects = grider.figureBuilder.validator.getSelfIntersectsPoints(shape);
    this.closeCells = grider.figureBuilder.validator.getTooCloseCells(shape, grider.params);

    this.path = grider.buildFigure(shape, !outer);
    this.simplePath = this.borderRenderer.simplifyFigure([...this.path], [...border], grider.params);
  }

  render() {
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

    return ([        
      <SmartPolyline
        path={this.path}
        strokeColor='#880000'
        strokeWeight={3}
        key="border"
      />,    
      <SmartPolyline
        path={this.simplePath}
        strokeColor='#000000'
        strokeWeight={2}
        key="simple-border"
      />
    ]);
  }
}
