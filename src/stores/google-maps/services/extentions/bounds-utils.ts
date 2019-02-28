export const createBoundsUtils = (google: Google) => ({
  boundsToLiteral(
    bounds: google.maps.LatLngBounds,
  ): google.maps.LatLngBoundsLiteral {
    const northEast: google.maps.LatLng = bounds.getNorthEast();
    const southWest: google.maps.LatLng = bounds.getSouthWest();

    return {
      east: northEast.lng(),
      north: northEast.lat(),
      south: southWest.lat(),
      west: southWest.lng(),
    };
  },
  pointsToBounds(
    points: google.maps.LatLngLiteral[],
  ): google.maps.LatLngBounds {
    const bounds = points.reduce((
      latLngBounds: google.maps.LatLngBounds,
      point: google.maps.LatLngLiteral,
    ): google.maps.LatLngBounds => latLngBounds.extend(point),
    new google.maps.LatLngBounds());

    return bounds;
  },
});
