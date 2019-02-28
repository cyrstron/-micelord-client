export const createGridMapTypeClass = (google: Google): google.custom.GridMapTypeConstructor => {
  class GridMapType implements google.custom.GridMapType {
    index: number;
    size: google.maps.Size;
    map: google.maps.Map | null = null;
    maxZoom?: number;
    minZoom?: number;

    constructor({
      index,
      height,
      width,
      heightUnit,
      widthUnit,
      maxZoom,
      minZoom,
      map,
    }: google.custom.GridMapTypeOptions) {
      this.index = index;
      this.maxZoom = maxZoom;
      this.minZoom = minZoom;

      this.size = this.calcTileSize({
        height,
        heightUnit,
        width,
        widthUnit,
      });

      this.setMap(map || null);
    }

    get tileSize(): google.maps.Size {
      return this.size;
    }

    set tileSize(size: google.maps.Size) {
      this.size = size;
    }

    getTile(
      tileCoord: google.maps.Point,
      zoom: number,
      ownerDocument: Document,
    ): Element | null {
      if (
        (this.maxZoom && zoom > this.maxZoom) ||
        (this.minZoom && zoom < this.minZoom)
      ) {
        return null;
      }

      const x = ((tileCoord.x / Math.pow(2, zoom)) - 0.5) * 360;
      const y = (0.5 - (tileCoord.y / Math.pow(2, zoom))) * 180;

      const container = ownerDocument.createElement('svg');

      container.innerHTML = `(${y}, ${x})`;
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.fontSize = '10';
      container.style.borderStyle = 'dashed';
      container.style.display = 'block';
      container.style.borderWidth = '1px';
      container.style.borderColor = '#00AA00';

      return container;
    }

    releaseTile(tile: Node) {
      //
    }

    setMap(map: google.maps.Map | null) {
      if (map === null || this.map !== map) {
        this.remove();
      }

      if (map) {
        map.overlayMapTypes.insertAt(this.index, this as google.maps.MapType);
      }

      this.map = map;
    }

    remove() {
      if (!this.map) return;

      this.map.overlayMapTypes.removeAt(this.index);
    }

    private setTileSize({
      width,
      height,
      widthUnit,
      heightUnit,
    }: {
      width: number,
      height?: number,
      widthUnit?: string,
      heightUnit?: string,
    }) {
      this.size = this.calcTileSize({
        height,
        heightUnit,
        width,
        widthUnit,
      });
    }

    private calcTileSize({
      width,
      height,
      widthUnit,
      heightUnit,
    }: {
      width: number,
      height?: number,
      widthUnit?: string,
      heightUnit?: string,
    }) {
      if (widthUnit && heightUnit) {
        return new google.maps.Size(
          width,
          height || width,
          widthUnit,
          heightUnit,
        );
      } else {
        return new google.maps.Size(width, height || width);
      }
    }
  }

  return GridMapType;
};
