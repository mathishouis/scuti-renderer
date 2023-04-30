import {IPosition3D} from "../../../interfaces/Room";
import {Direction} from "../../../enums/Direction";

export abstract class RoomObjectVisualization {
  public _loaded: boolean = false;
  abstract render(): void;
  abstract renderPlaceholder(): void;
  abstract updatePosition(): void;
  abstract move(position: IPosition3D, duration?: number): void;
  abstract rotate(direction: Direction, duration?: number): void;
  abstract destroy(): void;
  get loaded(): boolean {
    return this._loaded;
  }
}
