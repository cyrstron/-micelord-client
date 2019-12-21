import React, {Component} from 'react';
import { 
  GridParams, 
  TileMercPoint, 
  MapGridTile, 
  Point 
} from '@micelord/grider';

interface Props {
  params: GridParams;
  tilePoint: TileMercPoint;
  mapTile: MapGridTile;
  border: Point[] | null,
}

export class GridTile extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      params,
      tilePoint,
      border
    } = this.props;

    return (
      !tilePoint.isEqual(nextProps.tilePoint) ||
      params !== nextProps.params ||
      border !== nextProps.border
    );
  }

  render() {
    const {
      tilePoint,
      params,
      mapTile,
      border,
    } = this.props;
    
    const minCellSize = params.minCellSize(tilePoint);

    if (minCellSize < 10) return null;

    const stokeWidth = Math.max(1, Math.min(10, minCellSize / 50));
    const strokeOpacity = Math.min(minCellSize / 100, 0.5);
    const maskId = `mask-${tilePoint.tileX}-${tilePoint.tileY}`;

    const {
      tileX,
      tileY,
      tileWidth,
      tileHeight
    } = tilePoint;

    return (
      <>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox={`0 0 ${tilePoint.tileWidth} ${tilePoint.tileHeight}`}
          aria-labelledby='title' 
          fill="transparent" 
        >
        {mapTile && mapTile.patterns.map(({start, end, tile}, index) => {
          const patternId = `pattern-${tileX}-${tileY}-${index}`;
          const patternWidth = tileWidth * tile.tileWidth;
          const patternHeight = tileHeight * tile.tileHeight;

          const rectWidth = (end.x - start.x) * tileWidth;
          const rectHeight = (end.y - start.y) * tileHeight;

          const patternWidthPercent = patternWidth / rectWidth * 100;
          const patternHeightPercent = patternHeight / rectHeight * 100;

          return (
            <pattern 
              id={patternId}
              key={patternId}
              width={`${patternWidthPercent}%`} 
              height={`${patternHeightPercent}%`}
            >
              {tile.points.map((polyline, polylineIndex) => {
                const points = polyline.map(({x, y}) => (
                  `${Math.round((x) * patternWidth)},${Math.round((y) * patternHeight)}`
                ))
                  .join(' ');
                  
                return (
                  <polyline 
                    points={points}
                    stroke="orange"
                    strokeWidth={stokeWidth}
                    key={`${tileX}-${tileY}-${index}-${polylineIndex}`}
                  />
                )
              })}
            </pattern>
          )
        })}  
          <mask id={maskId}>  
            {mapTile && mapTile.patterns.map(({start, end, tile}, index) => {
              const patternId = `pattern-${tileX}-${tileY}-${index}`;
              const rectWidth = (end.x - start.x) * tileWidth;
              const rectHeight = (end.y - start.y) * tileHeight;

              return (
                <rect 
                  fill={`url(#${patternId})`} 
                  x={start.x * tileWidth}
                  y={start.y * tileHeight}
                  width={rectWidth}
                  height={rectHeight}
                  key={patternId}
                /> 
              )
            })}    
          </mask>
          <rect 
            mask={`url(#${maskId})`} 
            fill={`rgba(40, 40, 40, ${strokeOpacity})`}
            strokeWidth={stokeWidth}
            width={tilePoint.tileWidth}
            height={tilePoint.tileHeight}
          />
          {border && border.length > 0 && (
            <polygon 
              mask={`url(#${maskId})`} 
              points={border.map(({x, y}) => `${x},${y}`).join(' ')}
              fill="rgba(0, 255, 0, 1)"
              stroke="rgba(0, 255, 0, 1)"
              strokeWidth={stokeWidth}
            />
          )}
        </svg>
      </>
    )
  }
}
