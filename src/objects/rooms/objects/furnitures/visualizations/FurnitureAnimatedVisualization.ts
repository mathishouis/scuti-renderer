import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureAnimatedVisualization extends FurnitureVisualization {
  constructor({ furniture }: Configuration) {
    super({ furniture });

    this.furniture = furniture;

    this.furniture.room.visualization.furnituresTicker.add(() => this.next());
  }

  public destroy(): void {
    super.destroy();

    this.furniture.room.visualization.furnituresTicker.remove(() => this.next());
  }

  public next() {
    super.next();
  }

  public getLastFramePlayed(id: number): boolean {
    const layer = this.data.layers.get(id);

    if (layer) return layer.frameIndex === layer.frames.length - 1;

    return false;
  }
}
