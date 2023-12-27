import { FurnitureBrandedImageVisualization } from './FurnitureBrandedImageVisualization.ts';

export class FurnitureBBVisualization extends FurnitureBrandedImageVisualization {
  public getLayerXOffset(id: number): number {
    return super.getLayerXOffset(id) + (this._offsets?.x ?? 0);
  }

  public getLayerYOffset(id: number): number {
    return super.getLayerYOffset(id) + (this._offsets?.y ?? 0);
  }

  public getLayerZOffset(id: number): number {
    return super.getLayerZOffset(id) + (this._offsets?.z ?? 0);
  }
}
