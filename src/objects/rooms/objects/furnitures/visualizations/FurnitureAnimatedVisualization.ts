import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureAnimatedVisualization extends FurnitureVisualization {
  public render(): void {
    super.render();

    this.furniture.room.renderer.application.ticker.add(() => this.next());
  }

  public destroy(): void {
    super.destroy();

    this.furniture.room.renderer.application.ticker.remove(() => this.next());
  }
}
