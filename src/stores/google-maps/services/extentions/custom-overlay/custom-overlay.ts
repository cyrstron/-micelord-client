export const createCustomOverlayClass = (google: Google) => {
  class CustomOverlay extends google.maps.OverlayView implements google.custom.CustomOverlay {
    private bounds: google.maps.LatLngBounds;
    private container?: HTMLDivElement;
    private map: google.maps.Map | null;
    private google: Google = google;

    constructor({
      bounds,
      map,
    }: google.custom.CustomOverlayOptions) {
      super();

      this.bounds = this.toBounds(bounds);
      this.container = document.createElement('div');
      this.container.style.position = 'absolute';

      if (map) {
        this.map = map;
        this.setMap(map);
      } else {
        this.map = null;
      }
    }

    getContainer(): HTMLDivElement | void {
      return this.container;
    }

    onAdd() {
      const panes = this.getPanes();
      const {container} = this;

      if (!container) return;

      panes.overlayLayer.appendChild(container);
    }

    onRemove() {
      const {container} = this;

      const parentNode = container && container.parentNode;

      if (parentNode && container) {
        parentNode.removeChild(container);
      }

      this.container = undefined;
    }

    setOpacity(opacity?: number): void {
      if (opacity === undefined) return;

      const {container} = this;

      if (!container) return;

      container.style.opacity = `${opacity}`;
    }

    setIsHidden(isHidden?: boolean): void {
      if (isHidden === undefined) return;

      if (isHidden) {
        this.hide();
      } else {
        this.show();
      }
    }

    setBounds(
      bounds?: google.maps.LatLngBounds |
        google.maps.LatLngBoundsLiteral |
        google.maps.LatLngLiteral[],
    ): void {
      if (!bounds) return;

      this.bounds = this.toBounds(bounds);
      this.draw();
    }

    setOptions({
      opacity,
      isHidden,
      bounds,
      map,
    }: google.custom.CustomOverlayOptions): void {
      this.setOpacity(opacity);
      this.setIsHidden(isHidden);
      if (map !== undefined) {
        this.setMap(map);
      }
      this.setBounds(bounds);
    }

    draw(): void {
      const {
        container,
        bounds,
      } = this;

      if (!container) return;

      const overlayProjection = this.getProjection();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();

      const {
        x: left,
        y: top,
      } = overlayProjection.fromLatLngToDivPixel(southWest);

      const {
        x: right,
        y: bottom,
      } = overlayProjection.fromLatLngToDivPixel(northEast);

      container.style.left = `${left}px`;
      container.style.top = `${top}px`;
      container.style.width = `${right - left}px`;
      container.style.height = `${top - bottom}px`;
    }

    hide() {
      const {container} = this;

      if (!container) return;

      container.style.visibility = 'hidden';
    }

    show() {
      const {container} = this;

      if (!container) return;

      container.style.visibility = 'visible';
    }

    toggle() {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(this.map);
      }
    }

    private toBounds(
      bounds: google.maps.LatLngBounds |
        google.maps.LatLngBoundsLiteral |
        google.maps.LatLngLiteral[],
    ): google.maps.LatLngBounds {
      if (Array.isArray(bounds)) {
        bounds = this.google.custom.pointsToBounds(bounds);
      } else if (!(bounds instanceof google.maps.LatLngBounds)) {
        const {
          south,
          west,
          north,
          east,
        } = bounds;

        bounds = new google.maps.LatLngBounds({
          lat: south,
          lng: west,
        }, {
          lat: north,
          lng: east,
        });
      }

      return bounds;
    }
  }

  return CustomOverlay;
};
