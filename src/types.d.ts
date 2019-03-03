declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.css' {
  const content: {[className: string]: string};
  export default content;
}

declare namespace geo {
  interface Location {
    lat: number;
    lng: number;
  }
}

declare namespace google.maps {
  interface MapType {
    getTile(
      tileCoord: google.maps.Point,
      zoom: number,
      ownerDocument: Document,
    ): Element | null;
  }
  interface MapConstructor {
    new(container: HTMLDivElement, options: google.maps.MapOptions): google.maps.Map;
  }

  interface MarkerConstructor {
    new(options: google.maps.MarkerOptions): google.maps.Marker;
  }

  interface PolygonConstructor {
    new(options: google.maps.PolygonOptions): google.maps.Polygon;
  }

  interface LatLngConstructor {
    new(lat: number, lng: number): google.maps.LatLng;
  }

  interface SizeConstructor {
    new(width: number, height: number): google.maps.Size;
    new(
      width: number, 
      height: number, 
      widthUnit: string,
      heightUnit: string,
      ): google.maps.Size;
  }

  type SizeOptions = {
    width: number, 
    height: number, 
  } | {
    width: number, 
    height: number, 
    widthUnit: string,
    heightUnit: string,
  }

  interface OverlayViewConstructor {
    new(): google.maps.OverlayView;
  }

  interface GroundOverlayConstructor {
    new(
      url: string, 
      bounds: LatLngBounds | LatLngBoundsLiteral,
      options: GroundOverlayOptions,
    ): google.maps.GroundOverlay;
  }

  interface LatLngBoundsConstructor {
    new(): google.maps.LatLngBounds;
    new(southWest: LatLngLiteral, northEast: LatLngLiteral): google.maps.LatLngBounds;
  }

  interface MapCreationOptions extends google.maps.MapOptions {
    zoom: number;
  }

  type MapEventHandler = () => void;
  type MapMouseEventHandler = (e:google.maps.MouseEvent) => void;
  type MapIconEventHandler = (e:google.maps.IconMouseEvent) => void;
  type MapPolyEventHandler = (e:google.maps.PolyMouseEvent) => void;
  
  interface MapsObject<
    MapsObjectEventName,
    MapsObjectOptions,
    MapsObjectEventHandler
  > {
    setOptions?(options: MapsObjectOptions): void;
    addListener(
      event: MapsObjectEventName,
      handler: MapsObjectEventHandler,
    ): google.maps.MapsEventListener;
  }

  interface Feature<
    FeatureEventName,
    FeatureOptions,
    FeatureEventHandler
  > extends MapsObject<  
    FeatureEventName,
    FeatureOptions,
    FeatureEventHandler
  > {
    setMap(map: Map | null): void;
  }
}

declare namespace google.custom {
  interface GridMapType {
    index: number;
    map: google.maps.Map | null;
    getTile(
      tileCoord: google.maps.Point,
      zoom: number,
      ownerDocument: Document,
    ): Element | null;
    setMap(map: google.maps.Map | null): void;
    remove(): void;
  }

  interface GridMapTypeOptions {
    width: number,
    height?: number,
    widthUnit?: string,
    heightUnit?: string,
    maxZoom?: number,
    minZoom?: number,
    index: number,
    map?: google.maps.Map,
  }

  type GridMapTypeConstructor = new(options: GridMapTypeOptions) => GridMapType;

  interface CustomOverlayOptions {
    map?: google.maps.Map;
    bounds: google.maps.LatLngBounds | 
      google.maps.LatLngBoundsLiteral |
      google.maps.LatLngLiteral[];
    opacity?: number;
    isHidden?: boolean;
  }
  
  type CustomOverlayConstructor = new(
    options: CustomOverlayOptions,
  ) => CustomOverlay;
  
  interface CustomOverlay extends google.maps.OverlayView {
    getContainer(): HTMLDivElement | void;
    setOpacity(opacity?: number): void;
    setIsHidden(isHidden?: boolean): void;
    setBounds(
      bounds?: google.maps.LatLngBounds |
        google.maps.LatLngBoundsLiteral |
        google.maps.LatLngLiteral[],
    ): void;
    setOptions({
      opacity,
      isHidden,
      bounds,
      map,
    }: google.custom.CustomOverlayOptions): void
  }
}

declare namespace google {
  interface Maps {
    Map: google.maps.MapConstructor;
    Marker: google.maps.MarkerConstructor;
    Polygon: google.maps.PolygonConstructor;
    LatLng: google.maps.LatLngConstructor;
    LatLngBounds: google.maps.LatLngBoundsConstructor;
    OverlayView: google.maps.OverlayViewConstructor;
    GroundOverlay: google.maps.GroundOverlayConstructor;
    Size: google.maps.SizeConstructor;
  }
  interface Custom {
    GridMapType: google.custom.GridMapTypeConstructor;
    CustomOverlay: google.custom.CustomOverlayConstructor;
    boundsToLiteral(
      bounds: google.maps.LatLngBounds,
    ): google.maps.LatLngBoundsLiteral;
    pointsToBounds(
      points: google.maps.LatLngLiteral[],
    ): google.maps.LatLngBounds
  }
}

declare interface Google {
  maps: google.Maps;
  custom: google.Custom;
}
