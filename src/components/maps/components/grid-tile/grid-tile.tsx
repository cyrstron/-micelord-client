import React, {Component, Fragment} from 'react';
import { 
  GridParams, 
  TileMercPoint, 
  MapGridTile, 
  IndexatedFigure, 
  Point 
} from '@micelord/grider';

interface Props {
  params: GridParams;
  tilePoint: TileMercPoint;
  borderline: IndexatedFigure,
}

interface State {
  borderPoly: Point[] | null;
}

export class GridTile extends Component<Props, State> {
  mapTile: MapGridTile;

  wasMounted: boolean = false;
  wasUnmounted: boolean = false;

  constructor(props: Props) {
    super(props);

    const {params, tilePoint} = props;

    this.mapTile = MapGridTile.fromTilePoint(tilePoint, params);

    this.state = {
      borderPoly: null,
    }

    this.updateBorderPoly();
  }

  componentDidMount() {
    this.wasMounted = true;
  }

  componentWillUnmount() {
    this.wasUnmounted = true;
  }

  async updateBorderPoly() {
    const {borderline, tilePoint} = this.props;

    try {
      const borderPoly = await borderline.tilePoints(tilePoint);

      if (this.wasUnmounted) return;

      if (!this.wasMounted) {
        this.state = {borderPoly};
      } else {
        this.setState({
          borderPoly
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  shouldComponentUpdate(_nextProps: Props, nextState: State) {
    const {
      borderPoly,
    } = this.state;

    return !borderPoly && !!nextState.borderPoly;
  }

  componentWillUpdate(nextProps: Props) {
    const {params, borderline, tilePoint} = this.props;

    if (nextProps.tilePoint !== tilePoint || nextProps.params !== params) {
      this.mapTile = MapGridTile.fromTilePoint(
        nextProps.tilePoint, 
        nextProps.params
      );
    }

    if (nextProps.borderline !== borderline || nextProps.tilePoint !== tilePoint) {
      this.updateBorderPoly()
    }
  }

  render() {
    const {
      tilePoint,
      params,
    } = this.props;

    const {
      borderPoly,
    } = this.state;
    
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
            {this.mapTile.patterns.map(({start, end, tile}, index) => {
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
          {borderPoly && borderPoly.length > 0 && (
            <polygon 
              mask={`url(#${maskId})`} 
              points={borderPoly.map(({x, y}) => `${x},${y}`).join(' ')}
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
