import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureScoreBoardVisualization extends FurnitureAnimatedVisualization {
  private static ONES_SPRITE: string = 'ones_sprite';
  private static TENS_SPRITE: string = 'tens_sprite';
  private static HUNDREDS_SPRITE: string = 'hundreds_sprite';
  private static THOUSANDS_SPRITE: string = 'thousands_sprite';

  public getLayerFrame(id: number): number {
    const tag = this.getLayerTag(id);
    const state = this.furniture.state;

    switch (tag) {
      case FurnitureScoreBoardVisualization.ONES_SPRITE:
        return Math.floor(state % 10);
      case FurnitureScoreBoardVisualization.TENS_SPRITE:
        return Math.floor((state / 10) % 10);
      case FurnitureScoreBoardVisualization.HUNDREDS_SPRITE:
        return Math.floor((state / 100) % 10);
      case FurnitureScoreBoardVisualization.THOUSANDS_SPRITE:
        return Math.floor((state / 1000) % 10);
      default:
        return super.getLayerFrame(id);
    }
  }
}
