import React, {Component} from 'react';
import {SmartPolyline, SmartMarker} from '@maps/feature';
import {StaticGrider} from '@micelord/grider';
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
  @observable selfIntersects: google.maps.LatLngLiteral[] = [];

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
    } = this.props;

    const shape = [...border];

    console.log(shape)

    this.selfIntersects = grider.figureBuilder.validator.getItselfIntersectsPoint(shape);

    this.path = grider.buildFigure(shape, !outer);
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

    return (
      <SmartPolyline
        path={this.path}
        strokeColor='#880000'
        strokeWeight={3}
        onClick={this.props.onClick}
      />
    );
  }
}
