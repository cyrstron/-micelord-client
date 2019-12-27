export interface GeoCoordFormatted {
  isPositive: boolean;
  deg: number;
  min: number;
  sec: number;
}

export const fromDec = (value: number): GeoCoordFormatted => {
  const isPositive = value >= 0;
  const deg = isPositive ? Math.floor(value) : Math.ceil(value);
  const rest = Math.abs(value - deg);

  const minutesFull = rest * 60;
  const min = Math.floor(minutesFull);

  const secondsFull = (minutesFull - min) * 60;
  const sec = +secondsFull.toFixed(4);

  return {
    isPositive,
    deg: Math.abs(deg),
    min,
    sec,
  };
};

export const toDec = ({
  deg, 
  min, 
  sec, 
  isPositive
}: GeoCoordFormatted) => {
  const value = deg + (min / 60) + (sec / 3600);

  return isPositive ? value : -value;
}