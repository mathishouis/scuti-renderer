import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
  color: number;
}

export class FurnitureStickieVisualization extends FurnitureVisualization {
  private static DEFAULT_COLOR: number = 0xffffff;

  private _color: number;

  constructor({ furniture, color }: Configuration) {
    super({ furniture });

    this._color = color;
  }

  public getLayerColor(id: number): number {
    if (this._color) return this._color;
    return FurnitureStickieVisualization.DEFAULT_COLOR;
  }

  public get color(): number {
    return this._color;
  }

  public set color(color: number) {
    this._color = color;
  }
}
