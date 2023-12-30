import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureAnimatedVisualization extends FurnitureVisualization {
  private _running: boolean = true;

  constructor({ furniture }: Configuration) {
    super({ furniture });

    this.furniture = furniture;

    this.furniture.room.visualization.furnituresTicker.add(() => this.next());
  }

  public destroy(): void {
    this.stopAnimation();
    this.furniture.room.visualization.furnituresTicker.remove(() => this.next());

    super.destroy();
  }

  public next(): void {
    if (!this._running) return;

    super.next();
  }

  public startAnimation(): void {
    this._running = true;
  }

  public stopAnimation(): void {
    this._running = false;
  }

  public setState(id: number): void {
    this.startAnimation();

    super.setState(id);
  }
}
