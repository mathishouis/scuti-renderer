import { FurnitureFireworksVisualization } from './FurnitureFireworksVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
  packetType: number;
  ribbonType: number;
}

export class FurnitureGiftWrappedFireworksVisualization extends FurnitureFireworksVisualization {
  private static PRESENT_DEFAULT_STATE: number = 0;
  private static HIDDEN_LAYERS: number[] = [0, 1, 2];

  protected _burstState: number = 1;

  private _packetType: number = 0;
  private _ribbonType: number = 0;
  private _lastStateId: number = 0;

  constructor({ furniture, packetType, ribbonType }: Configuration) {
    super({ furniture });

    this._packetType = packetType;
    this._ribbonType = ribbonType;
  }

  public getLayerFrame(id: number): number {
    if (this._lastStateId === FurnitureGiftWrappedFireworksVisualization.PRESENT_DEFAULT_STATE) {
      if (id <= 1) return this._packetType;

      if (id === 2) return this._ribbonType;
    }

    return super.getLayerFrame(id);
  }

  public getLayerAlpha(id: number): number {
    if (FurnitureGiftWrappedFireworksVisualization.HIDDEN_LAYERS.includes(id) && this.furniture.state === this._burstState) return 0;

    return 1;
  }

  public setState(id: number): void {
    this._lastStateId = id;

    super.setState(id);
  }
}
