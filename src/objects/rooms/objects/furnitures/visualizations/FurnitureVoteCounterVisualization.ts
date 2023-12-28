import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
  value: number;
}

export class FurnitureVoteCounterVisualization extends FurnitureAnimatedVisualization {
  private static ONES_TAG: string = 'ones_sprite';
  private static TENS_TAG: string = 'tens_sprite';
  private static HUNDREDS_TAG: string = 'hundreds_sprite';
  private static HIDE_COUNTER_SCORE: number = -1;

  private value: number;

  constructor({ furniture, value }: Configuration) {
    super({ furniture });

    this.value = value;
  }

  public getLayerFrame(id: number): number {
    const tag = this.getLayerTag(id);

    switch (tag) {
      case FurnitureVoteCounterVisualization.ONES_TAG:
        return this.value % 10;
      case FurnitureVoteCounterVisualization.TENS_TAG:
        return Math.floor(this.value / 10) % 10;
      case FurnitureVoteCounterVisualization.HUNDREDS_TAG:
        return Math.floor(this.value / 100);
      default:
        return super.getLayerFrame(id);
    }
  }

  public getLayerAlpha(id: number): number {
    if (this.value === FurnitureVoteCounterVisualization.HIDE_COUNTER_SCORE) {
      const tag = this.getLayerTag(id);
      switch (tag) {
        case FurnitureVoteCounterVisualization.ONES_TAG:
        case FurnitureVoteCounterVisualization.TENS_TAG:
        case FurnitureVoteCounterVisualization.HUNDREDS_TAG:
          return 0;
      }
    }

    return super.getLayerAlpha(id);
  }
}
