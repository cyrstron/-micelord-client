import React, {Component, Fragment} from 'react';
// import {StaticGrider, BorderRenderer, utils} from '@micelord/grider';
import { GridParams, TileMercPoint, MapGridTile, IndexatedFigure } from '@micelord/grider/src';
import { GeoPolygon } from '@micelord/grider/src';

interface Props {
  params: GridParams;
  tilePoint: TileMercPoint;
  // grider: StaticGrider;
  // width: number;
  // height: number;
  // tileCoord: grider.Point,
  // zoom: number,
  // borderRenderer: BorderRenderer,
  borderline: IndexatedFigure,
  // border: google.maps.LatLngLiteral[],
}

export class GridTile extends Component<Props> {
  mapTile: MapGridTile;
  borderPoly: GeoPolygon;

  constructor(props: Props) {
    super(props);

    const {params, borderline, tilePoint} = props;

    this.mapTile = MapGridTile.fromTilePoint(tilePoint, params);
    this.borderPoly = borderline.tilePoints(tilePoint);
  }
  shouldComponentUpdate(nextProps: Props) {
    const {
      tilePoint,
      params,
    } = this.props;

    return !nextProps.tilePoint.isEqual(tilePoint) && 
      !nextProps.params.isEqual(params);
  }

  componentDidMount() {
    // const {
    //   height,
    //   width,
    //   // borderRenderer,
    //   tileCoord,
    //   zoom,
    // } = this.props;
    
    // const zoomCoofX = 2 ** (zoom) * (256 / width);
    // const zoomCoofY = 2 ** (zoom) * (256 / height);

    // const tileBounds = borderRenderer.calcTileBounds(tileCoord, zoomCoofX, zoomCoofY);

    // const border = borderRenderer.getIntersectedBorder(tileBounds);

    // console.log(border);
  }

  render() {
    const {
      tilePoint,
      params,
    } = this.props;
    
    const minCellSize = params.minCellSize(tilePoint);

    if (minCellSize < 10) return null;

    const stokeWidth = Math.max(1, Math.min(10, minCellSize / 50));
    const strokeOpacity = Math.min(minCellSize / 100, 0.5);

    const {
      tileX,
      tileY,
      tileWidth,
      tileHeight
    } = tilePoint;

    // const {patterns} = grider.calcGridConfig(tileCoord, zoomCoofX, zoomCoofY);

    return (
      <>    
        <span
          style={{
            top: 0,
            width: '100%',
            position: "absolute",
            textAlign: 'center',
            fontSize: '16px',
            padding: '5px',
            fontWeight: 'bold'
          }}
        >
          {tilePoint.tileX} : {tilePoint.tileY}
        </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox={`0 0 ${tilePoint.tileWidth} ${tilePoint.tileHeight}`}
          aria-labelledby='title' 
          fill="transparent" 
          style={{border: '1px dashed green'}}
        >
          {this.mapTile.patterns.map(({start, end, tile}, index) => {
            const patternId = `pattern-${tileX}-${tileY}-${index}`;
            const maskId = `mask-${tileX}-${tileY}-${index}`;
            const patternWidth = tileWidth * tile.tileWidth;
            const patternHeight = tileHeight * tile.tileHeight;

            const rectWidth = (end.x - start.x) * tileWidth;
            const rectHeight = (end.y - start.y) * tileHeight;

            const patternWidthPercent = patternWidth / rectWidth * 100;
            const patternHeightPercent = patternHeight / rectHeight * 100;

            return (
              <Fragment key={`${tileX}-${tileY}-${index}`}> 
                <pattern 
                  id={patternId}
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
                <mask id={maskId}>  
                  <rect 
                    fill={`url(#${patternId})`} 
                    x={start.x * tileWidth}
                    y={start.y * tileHeight}
                    width={rectWidth}
                    height={rectHeight}
                  /> 
                </mask>  
                <polygon 
                  mask={`url(#${maskId})`} 
                  fill={`rgba(0, 180, 0, 1)`}
                  stroke={`rgba(0, 180, 0, 1)`}
                  strokeWidth={stokeWidth}
                  width={tilePoint.tileWidth}
                  height={tilePoint.tileHeight}
                />
                <rect 
                  mask={`url(#${maskId})`} 
                  fill={`rgba(40, 40, 40, ${strokeOpacity})`}
                  x={start.x * tilePoint.tileWidth}
                  y={start.y * tilePoint.tileHeight}
                  width={rectWidth}
                  height={rectHeight}
                />
              </Fragment>
            )
          })}        
          <rect 
            width={tilePoint.tileWidth}
            height={tilePoint.tileHeight}
          />
        </svg>
      </>
    )
  }
}
