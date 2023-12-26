import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureAnimatedVisualization extends FurnitureVisualization {
  public render(): void {
    super.render();

    this.furniture.room.visualization.furnituresTicker.add(() => this.next());
  }

  public destroy(): void {
    super.destroy();

    this.furniture.room.visualization.furnituresTicker.remove(() => this.next());
  }
}
