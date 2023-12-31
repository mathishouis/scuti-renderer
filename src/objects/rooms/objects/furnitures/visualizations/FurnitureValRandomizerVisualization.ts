import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureValRandomizerVisualization extends FurnitureAnimatedVisualization {
  private static OFFSET_SLOW1_STATE: number = 20;
  private static OFFSET_SLOW2_STATE: number = 10;
  private static START_ROLL_STATE: number = 31;
  private static ROLL_STATE: number = 32;
  private static OFF_STATE: number = 30;

  private _stateQueue: number[] = [];
  private _running: boolean = false;

  constructor({ furniture }: Configuration) {
    super({ furniture });

    super.setState(FurnitureValRandomizerVisualization.OFF_STATE);
  }

  public setState(id: number): void {
    console.log(id);
    if (id === 0) {
      if (!this._running) {
        this._running = true;
        this._stateQueue = [];

        this._stateQueue.push(FurnitureValRandomizerVisualization.START_ROLL_STATE);
        this._stateQueue.push(FurnitureValRandomizerVisualization.ROLL_STATE);

        return;
      }
    }

    if (id > 0 && id <= FurnitureValRandomizerVisualization.OFFSET_SLOW2_STATE) {
      if (this._running) {
        this._running = false;
        this._stateQueue = [];

        if (this.furniture.direction === 2) {
          this._stateQueue.push(FurnitureValRandomizerVisualization.OFFSET_SLOW1_STATE + 5);
          this._stateQueue.push(FurnitureValRandomizerVisualization.OFFSET_SLOW2_STATE + 5);
        } else {
          this._stateQueue.push(FurnitureValRandomizerVisualization.OFFSET_SLOW1_STATE + id);
          this._stateQueue.push(FurnitureValRandomizerVisualization.OFFSET_SLOW2_STATE + id);
        }

        this._stateQueue.push(FurnitureValRandomizerVisualization.OFF_STATE);

        return;
      }

      super.setState(FurnitureValRandomizerVisualization.OFF_STATE);
    }
  }

  public updateState(): number {
    if (this.getLastFramePlayed(11) && this._stateQueue.length) super.setState(this._stateQueue.shift() ?? 0);

    return super.updateState();
  }
}
