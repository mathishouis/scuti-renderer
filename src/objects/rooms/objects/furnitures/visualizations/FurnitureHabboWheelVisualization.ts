import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureHabboWheelVisualization extends FurnitureAnimatedVisualization {
  private static OFFSET_SLOW1_STATE: number = 10;
  private static OFFSET_SLOW2_STATE: number = 20;
  private static START_ROLL_STATE: number = 31;
  private static ROLL_STATE: number = 32;

  private _stateQueue: number[] = [];
  private _running: boolean = false;

  public setState(id: number): void {
    if (id === -1) {
      if (!this._running) {
        this._running = true;
        this._stateQueue = [];

        this._stateQueue.push(FurnitureHabboWheelVisualization.START_ROLL_STATE);
        this._stateQueue.push(FurnitureHabboWheelVisualization.ROLL_STATE);

        return;
      }
    }

    if (id > 0 && id <= FurnitureHabboWheelVisualization.OFFSET_SLOW1_STATE) {
      if (this._running) {
        this._running = false;
        this._stateQueue = [];

        this._stateQueue.push(FurnitureHabboWheelVisualization.OFFSET_SLOW1_STATE + id);
        this._stateQueue.push(FurnitureHabboWheelVisualization.OFFSET_SLOW2_STATE + id);
        this._stateQueue.push(id);

        return;
      }

      super.setState(id);
    }
  }

  public updateState(): number {
    if (this.getLastFramePlayed(1) && this.getLastFramePlayed(2) && this.getLastFramePlayed(3) && this._stateQueue.length)
      super.setState(this._stateQueue.shift() ?? 0);

    return super.updateState();
  }
}
