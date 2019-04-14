import React, {Component} from 'react';
import {StaticGrider, utils} from '@micelord/grider';
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
      tileCoord
    } = this.props;

    return !isEqual(nextProps.tileCoord, tileCoord) && nextProps.zoom !== zoom;
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

    console.log(gridConfig);

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
            <>
              <pattern 
                id={patternId}
                width={`${patternWidthPercent}%`} 
                height={`${patternHeightPercent}%`}
              >
                {patternConfig.pattern.map((polyline) => {
                  const points = polyline.map(({x, y}) => (
                    `${x * patternWidth},${y * patternHeight}`
                  ))
                    .join(' ');
                    
                  return (
                    <polyline 
                      points={points}
                      stroke="orange"
                      strokeWidth="3px"
                      vectorEffect="non-scaling-stroke"
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
            </>
          )
        })}        
        <rect 
          stroke="blue"
          strokeWidth="1px"
          width='512'
          height='512'
        />
      </svg>
    )
  }
}
