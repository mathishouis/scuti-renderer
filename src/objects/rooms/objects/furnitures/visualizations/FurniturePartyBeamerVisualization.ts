import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { Vector2D } from '../../../../../types/Vector';

export class FurniturePartyBeamerVisualization extends FurnitureAnimatedVisualization {
  private static AREA_DIAMETER: number = 31;
  private static SPEED_FAST_STATE: number = 2;
  private static SPEED_SLOW_STATE: number = 1;

  private _animPhaseIndex!: number[];
  private _animDirectionIndex!: number[];
  private _animSpeedIndex!: number[];
  private _animFactorIndex!: number[];
  private _animOffsetIndex: Vector2D[] = [];

  private _initialize(): void {
    this._animPhaseIndex = [];
    this._animPhaseIndex.push(Math.random() * FurniturePartyBeamerVisualization.AREA_DIAMETER * 1.5);
    this._animPhaseIndex.push(Math.random() * FurniturePartyBeamerVisualization.AREA_DIAMETER * 1.5);

    this._animDirectionIndex = [];
    this._animDirectionIndex.push(1);
    this._animDirectionIndex.push(-1);

    this._animSpeedIndex = [];
    this._animSpeedIndex.push(FurniturePartyBeamerVisualization.SPEED_FAST_STATE);
    this._animSpeedIndex.push(FurniturePartyBeamerVisualization.SPEED_SLOW_STATE);

    this._animFactorIndex = [];
    this._animFactorIndex.push(this._getRandomAmplitudeFactor());
    this._animFactorIndex.push(this._getRandomAmplitudeFactor());
  }

  public updateState(): number {
    if (!this._animSpeedIndex) this._initialize();

    let sprite = this.getLayer(2);

    if (sprite) this._animOffsetIndex[0] = this._getNewVector(0);

    sprite = this.getLayer(3);

    if (sprite) this._animOffsetIndex[1] = this._getNewVector(1);

    return super.updateState();
  }

  public getLayerXOffset(id: number, direction: number): number {
    if ((id === 2 || id === 3) && this._animOffsetIndex.length == 2) {
      return this._animOffsetIndex[id - 2].x;
    }
    return super.getLayerXOffset(id, direction);
  }

  public getLayerYOffset(id: number, direction: number): number {
    if ((id === 2 || id === 3) && this._animOffsetIndex.length == 2) {
      return this._animOffsetIndex[id - 2].y;
    }
    return super.getLayerYOffset(id, direction);
  }

  private _getNewVector(id: number): Vector2D {
    let phase: number = this._animPhaseIndex[id];
    let direction: number = this._animDirectionIndex[id];

    const speed: number = this._animSpeedIndex[id];
    const factor: number = this._animFactorIndex[id];
    const offset: number = phase + direction * speed;

    if (Math.abs(offset) >= FurniturePartyBeamerVisualization.AREA_DIAMETER) {
      if (direction > 0) {
        phase = phase - (offset - FurniturePartyBeamerVisualization.AREA_DIAMETER);
      } else {
        phase = phase + (-FurniturePartyBeamerVisualization.AREA_DIAMETER - offset);
      }

      direction = -direction;
      this._animDirectionIndex[id] = direction;
    }

    const adjustedOffset: number = (FurniturePartyBeamerVisualization.AREA_DIAMETER - Math.abs(phase)) * factor;
    let newY: number = direction * Math.sin(Math.abs(phase / 4)) * adjustedOffset;

    if (direction > 0) {
      newY = newY - adjustedOffset;
    } else {
      newY = newY + adjustedOffset;
    }

    phase = phase + direction * speed;
    this._animPhaseIndex[id] = phase;

    if (Math.trunc(newY) == 0) this._animFactorIndex[id] = this._getRandomAmplitudeFactor();

    return {
      x: phase,
      y: newY,
    };
  }

  private _getRandomAmplitudeFactor(): number {
    return (Math.random() * 30) / 100 + 0.15;
  }
}
