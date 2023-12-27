import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureCounterClockVisualization extends FurnitureAnimatedVisualization {
  private static SECONDS_TAG: string = 'seconds_sprite';
  private static TEN_SECONDS_TAG: string = 'ten_seconds_sprite';
  private static MINUTES_TAG: string = 'minutes_sprite';
  private static TEN_MINUTES_TAG: string = 'ten_minutes_sprite';

  public getLayerFrame(id: number): number {
    const tag = this.getLayerTag(id);

    switch (tag) {
      case FurnitureCounterClockVisualization.SECONDS_TAG:
        return Math.floor((this.furniture.state % 60) % 10);
      case FurnitureCounterClockVisualization.TEN_SECONDS_TAG:
        return Math.floor((this.furniture.state % 60) / 10);
      case FurnitureCounterClockVisualization.MINUTES_TAG:
        return Math.floor((this.furniture.state / 60) % 10);
      case FurnitureCounterClockVisualization.TEN_MINUTES_TAG:
        return Math.floor((this.furniture.state / 60 / 10) % 10);
      default:
        return super.getLayerFrame(id);
    }
  }
}
