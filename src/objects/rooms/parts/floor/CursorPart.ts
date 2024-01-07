import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';
import { Container, Sprite, Texture } from 'pixi.js';
import { EventManager } from '../../../events/EventManager';
import { Vector3D } from '../../../../types/Vector';
import { asset } from '../../../../utils/Assets';
import { cursorOrder } from '../../../../utils/Sorting';

interface Configuration {
  position?: Vector3D;
}

export class CursorPart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager!: EventManager;

  private _position: Vector3D;
  private _sprite!: Sprite;

  constructor({ position }: Configuration) {
    super();

    this._position = position ?? { x: 0, y: 0, z: 0 };
  }

  public render(): void {
    const texture: Texture = asset('room/content').textures['tile_cursor'];

    this._sprite = new Sprite(texture);
    this._sprite.parentLayer = this.room.renderer.layer;

    if (this.room.parsedHeightMap.door === this._position) {
      this._sprite.zOrder = cursorOrder(this._position, true);
    } else {
      this._sprite.zOrder = cursorOrder(this._position);
    }

    this.container.addChild(this._sprite);
  }

  public show(): void {
    this.container.alpha = 1;
  }

  public hide(): void {
    this.container.alpha = 0;
  }

  public move({ x, y, z }: Vector3D): void {
    this._position = { x, y, z };
    this.container.x = 32 * x - 32 * y;
    this.container.y = 16 * x + 16 * y - 32 * z - 20;

    if (this.room.parsedHeightMap.door) {
      if (this.room.parsedHeightMap.door.x === x && this.room.parsedHeightMap.door.y === y) {
        this._sprite.zOrder = cursorOrder(this._position, true);
      } else {
        this._sprite.zOrder = cursorOrder(this._position);
      }
    }
  }

  public destroy(): void {
    if (this.container !== undefined) {
      this.container.destroy();
      this.container = undefined as any;
    }
  }
}
