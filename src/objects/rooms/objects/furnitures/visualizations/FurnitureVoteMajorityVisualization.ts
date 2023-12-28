import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
  value: number;
}

export class FurnitureVoteMajorityVisualization extends FurnitureAnimatedVisualization {
  private static ONES_TAG: string = 'ones_sprite';
  private static TENS_TAG: string = 'tens_sprite';
  private static HUNDREDS_TAG: string = 'hundreds_sprite';
  private static HIDE_RESULTS_STATES: number[] = [-1, 1];
  private static HIDE_RESULTS_VALUE: number = -1;

  private value: number;

  constructor({ furniture, value }: Configuration) {
    super({ furniture });

    this.value = value;
  }

  public getLayerFrame(id: number): number {
    const tag = this.getLayerTag(id);
    const value = this.value;

    switch (tag) {
      case FurnitureVoteMajorityVisualization.ONES_TAG:
        return Math.floor(value % 10);
      case FurnitureVoteMajorityVisualization.TENS_TAG:
        return Math.floor((value / 10) % 10);
      case FurnitureVoteMajorityVisualization.HUNDREDS_TAG:
        return Math.floor((value / 100) % 10);
      default:
        return super.getLayerFrame(id);
    }
  }

  public getLayerAlpha(id: number): number {
    if (
      !(FurnitureVoteMajorityVisualization.HIDE_RESULTS_STATES.indexOf(this.furniture.state) === -1) ||
      this.value === FurnitureVoteMajorityVisualization.HIDE_RESULTS_VALUE
    ) {
      const tag = this.getLayerTag(id);

      switch (tag) {
        case FurnitureVoteMajorityVisualization.ONES_TAG:
        case FurnitureVoteMajorityVisualization.TENS_TAG:
        case FurnitureVoteMajorityVisualization.HUNDREDS_TAG:
          return 0;
      }
    }

    return super.getLayerAlpha(id);
  }
}
