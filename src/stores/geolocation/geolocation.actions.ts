export class GeolocationActions {
  watchPosition(
    positionWatcher: (position: Position) => void ,
    errorHandler: (position: PositionError) => void,
    options: PositionOptions,
  ): number {
    const watchId = navigator.geolocation.watchPosition(
      positionWatcher,
      errorHandler,
      options,
    );

    return watchId;
  }

  unwatchPosition(watchId: number): void {
    navigator.geolocation.clearWatch(watchId);
  }
}
