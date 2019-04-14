import React, {Component, Fragment} from 'react';
import {StaticGrider} from '@micelord/grider';
import isEqual from 'lodash/isEqual';

interface Props {
  grider: StaticGrider;
  width: number;
  height: number;
  tileCoord: grider.Point,
  zoom: number,
}

export class GridTile extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      zoom,
      tileCoord,
      width,
      height,
      grider,
    } = this.props;

    const shouldUpdate = !isEqual(nextProps.tileCoord, tileCoord) || (
      nextProps.zoom !== zoom
    ) || (
      grider !== nextProps.grider
    ) || (
      width !== nextProps.width
    ) || (
      height !== nextProps.height
    );

    return shouldUpdate;
  }

  render() {
    const {
      height,
      width,
      grider,
      tileCoord,
      zoom,
    } = this.props;

    const zoomCoofX = 2 ** (zoom) * (256 / width);
    const zoomCoofY = 2 ** (zoom) * (256 / height);

    const gridConfig = grider.calcGridConfig(tileCoord, zoomCoofX, zoomCoofY);

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        viewBox={`0 0 ${width} ${height}`}
        aria-labelledby='title' 
        fill="transparent" 
      >
        {gridConfig.map(({start, end, patternConfig}, index) => {
          const patternId = `pattern-${tileCoord.x}-${tileCoord.y}-${index}`;
          const maskId = `mask-${tileCoord.x}-${tileCoord.y}-${index}`;
          const patternWidth = width * patternConfig.widthRel;
          const patternHeight = height * patternConfig.heightRel;

          const rectWidth = (end.x - start.x) * width;
          const rectHeight = (end.y - start.y) * height;

          const patternWidthPercent = patternWidth / rectWidth * 100;
          const patternHeightPercent = patternHeight / rectHeight * 100;

          return (
            <Fragment key={`${tileCoord.x}-${tileCoord.y}-${index}`}> 
              <pattern 
                id={patternId}
                width={`${patternWidthPercent}%`} 
                height={`${patternHeightPercent}%`}
              >
                {patternConfig.pattern.map((polyline, polylineIndex) => {
                  const points = polyline.map(({x, y}) => (
                    `${x * patternWidth},${y * patternHeight}`
                  ))
                    .join(' ');
                    
                  return (
                    <polyline 
                      points={points}
                      stroke="orange"
                      strokeWidth="3px"
                      key={`${tileCoord.x}-${tileCoord.y}-${index}-${polylineIndex}`}
                    />
                  )
                })}
              </pattern>
              <mask id={maskId}>  
                <rect 
                  fill={`url(#${patternId})`} 
                  x={start.x * width}
                  y={start.y * height}
                  width={rectWidth}
                  height={rectHeight}
                /> 
              </mask>  
              <rect 
                mask={`url(#${maskId})`} 
                fill="#00000044"
                x={start.x * width}
                y={start.y * height}
                width={rectWidth}
                height={rectHeight}
              />
            </Fragment>
          )
        })}        
        {/* <rect 
          stroke="blue"
          strokeWidth="1px"
          width='512'
          height='512'
        /> */}
      </svg>
    )
  }
}
