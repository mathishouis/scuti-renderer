import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureStaticVisualization extends FurnitureVisualization {
  public furniture: RoomFurniture;

  constructor({ furniture }: Configuration) {
    super();

    this.furniture = furniture;
  }

  public update(): void {}
  public next(): void {}
  public destroy(): void {}
}
