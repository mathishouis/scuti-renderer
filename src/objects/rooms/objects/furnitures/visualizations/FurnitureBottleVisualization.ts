import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureBottleVisualization extends FurnitureAnimatedVisualization {
  private static OFFSET_SLOW1_ANIMATION_ID: number = 20;
  private static OFFSET_SLOW2_ANIMATION_ID: number = 9;
  private static ROLL_ANIMATION_ID: number = -1;

  private _stateQueue: number[] = [];
  private _running: boolean = false;

  public setState(id: number): void {
    if (id === -1 && !this._running) {
      this._running = true;
      this._stateQueue = [];
      this._stateQueue.push(FurnitureBottleVisualization.ROLL_ANIMATION_ID);

      return;
    } else if (id >= 0 && id <= 7) {
      if (this._running) {
        this._running = false;
        this._stateQueue = [];
        this._stateQueue.push(FurnitureBottleVisualization.OFFSET_SLOW1_ANIMATION_ID);
        this._stateQueue.push(FurnitureBottleVisualization.OFFSET_SLOW2_ANIMATION_ID + id);
        this._stateQueue.push(id);

        return;
      }

      super.setState(id);
    }
  }

  public updateState(): number {
    if (this.getLastFramePlayed(0) && this._stateQueue.length) super.setState(this._stateQueue.shift() as number);

    return super.updateState();
  }
}
