export abstract class RoomObjectVisualization {
  public _loaded: boolean = false;
  abstract render(): void;
  abstract renderPlaceholder(): void;
  abstract updatePosition(): void;
  abstract destroy(): void;
  get loaded(): boolean {
    return this._loaded;
  }
}
