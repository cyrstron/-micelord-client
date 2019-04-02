import React, {Component} from 'react';
import {SmartPolyline} from '@maps/feature';
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
  @observable path: google.maps.LatLngLiteral[];

  constructor(props: Props) {
    super(props);

    const {
      grider,
      border,
      outer,
    } = props;

    this.path = grider.buildFigure(border, !outer);
  }

  componentDidUpdate(prevProps: Props) {
    const {
      border,
      grider,
      outer,
    } = this.props;

    if (prevProps.border === border) return;

    this.path = grider.buildFigure(border, !outer);
  }

  render() {
    return (
      <SmartPolyline
        path={this.path}
        strokeColor='#880000'
        strokeOpacity={0.4}
        strokeWeight={2}
        onClick={this.props.onClick}
      />
    );
  }
}
