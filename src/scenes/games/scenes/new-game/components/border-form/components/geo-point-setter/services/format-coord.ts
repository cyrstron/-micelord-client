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
    deg,
    min,
    sec,
  };
};

export const toDec = ({deg, sec, min, isPositive}: GeoCoordFormatted) => {
  const rest = (sec / 60) + (min / 60);

  return isPositive ? deg + rest : deg - rest;
}