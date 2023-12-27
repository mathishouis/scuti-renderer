import { FurnitureVisualization } from './FurnitureVisualization';
import { asset } from '../../../../../utils/Assets';

export class FurnitureAnimatedVisualization extends FurnitureVisualization {
  public render(): void {
    super.render();

    this.furniture.room.visualization.furnituresTicker.add(() => this.next());
  }

  public destroy(): void {
    super.destroy();

    this.furniture.room.visualization.furnituresTicker.remove(() => this.next());
  }

  public getLastFramePlayed(id: number): boolean {
    const spritesheet = asset(this.getAssetName());
    const { animations } = spritesheet.data.properties;
    const animation = animations.find((animation: any) => animation.state === this.furniture.state);

    if (animation) {
      const animationLayer = animation.layers.find((layer: any) => layer.id === id);
      if (animationLayer && animationLayer.frames) {
        return this.frames.get(id) === animationLayer.frames.length - 1;
      }
    }

    return false;
  }
}
