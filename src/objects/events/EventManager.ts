import { TileEvent } from '../../entities/Events';

export class EventManager {
  private _isDoubleClicking: boolean = false;
  private _doubleClickTimeout!: number;

  public onPointerDown!: (event: TileEvent) => void;
  public onPointerUp!: (event: TileEvent) => void;
  public onPointerMove!: (event: TileEvent) => void;
  public onPointerOut!: (event: TileEvent) => void;
  public onPointerOver!: (event: TileEvent) => void;
  public onDoublePointerDown!: (event: TileEvent) => void;

  public handlePointerDown(event: TileEvent): void {
    if (!this._isDoubleClicking) {
      if (this.onPointerDown) this.onPointerDown(event);
      this._isDoubleClicking = true;
      this._doubleClickTimeout = window.setTimeout(() => {
        return (this._isDoubleClicking = false);
      }, 350);
    } else {
      if (this.onDoublePointerDown) this.onDoublePointerDown(event);
      this._isDoubleClicking = false;
      window.clearTimeout(this._doubleClickTimeout);
    }
  }

  public handlePointerUp(event: TileEvent): void {
    if (this.onPointerUp) this.onPointerUp(event);
  }

  public handlePointerMove(event: TileEvent): void {
    if (this.onPointerMove) this.onPointerMove(event);
  }

  public handlePointerOut(event: TileEvent): void {
    if (this.onPointerOut) this.onPointerOut(event);
  }

  public handlePointerOver(event: TileEvent): void {
    if (this.onPointerOver) this.onPointerOver(event);
  }
}
