import { FurnitureVisualization } from './FurnitureVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureAnimatedVisualization extends FurnitureVisualization {
  private _animationRunning: boolean = true;

  constructor({ furniture }: Configuration) {
    super({ furniture });

    this.furniture = furniture;

    if (this.furniture.room.visualization) this.furniture.room.visualization.furnituresTicker.add(this.next, this);
  }

  public destroy(): void {
    this.stopAnimation();

    if (this.furniture.room.visualization) this.furniture.room.visualization.furnituresTicker.remove(this.next, this);

    super.destroy();
  }

  public next(): void {
    if (!this._animationRunning) return;

    super.next();
  }

  public startAnimation(): void {
    this._animationRunning = true;
  }

  public stopAnimation(): void {
    this._animationRunning = false;
  }

  public setState(id: number): void {
    this.startAnimation();

    super.setState(id);
  }
}
