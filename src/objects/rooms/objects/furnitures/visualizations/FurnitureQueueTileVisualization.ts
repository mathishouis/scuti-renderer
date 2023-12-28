import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureQueueTileVisualization extends FurnitureAnimatedVisualization {
  private static ROLL_ONCE_STATE: number = 2;
  private static NORMAL_STATE: number = 1;
  private static ANIMATION_DURATION: number = 15;

  private _stateQueue: number[] = [];
  private _animationCounter: number = -1;

  public setState(id: number): void {
    if (id === FurnitureQueueTileVisualization.ROLL_ONCE_STATE) {
      this._stateQueue = [];
      this._stateQueue.push(FurnitureQueueTileVisualization.NORMAL_STATE);

      this._animationCounter = FurnitureQueueTileVisualization.ANIMATION_DURATION;
    }

    return super.setState(id);
  }

  public updateState(): number {
    if (this._animationCounter > 0) this._animationCounter--;

    if (!this._animationCounter) {
      if (this._stateQueue.length) super.setState(this._stateQueue.shift() ?? 0);
    }

    return super.updateState();
  }
}
