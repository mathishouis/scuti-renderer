import { FurnitureBrandedImageVisualization } from './FurnitureBrandedImageVisualization.ts';

export class FurnitureBBVisualization extends FurnitureBrandedImageVisualization {
  public getLayerXOffset(id: number, direction: number): number {
    return super.getLayerXOffset(id, direction) + (this._offsets?.x ?? 0);
  }

  public getLayerYOffset(id: number, direction: number): number {
    return super.getLayerYOffset(id, direction) + (this._offsets?.y ?? 0);
  }

  public getLayerZOffset(id: number, direction: number): number {
    return super.getLayerZOffset(id, direction) + (this._offsets?.z ?? 0);
  }
}
