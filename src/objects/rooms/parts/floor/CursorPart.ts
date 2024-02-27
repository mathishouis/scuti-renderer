import { Container, Sprite, Texture } from 'pixi.js';
import { cursorOrder, asset } from '../../../../utils';
import { EventManager } from '../../../events';
import { Vector3D } from '../../../../types';
import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';

interface Configuration {
  position?: Vector3D;
}

export class CursorPart extends RoomPart {
  public room!: Room;
  public container: Container | undefined = new Container();
  public eventManager!: EventManager;

  private _position: Vector3D;
  private _sprite!: Sprite;

  constructor(configuration?: Configuration) {
    super();

    this._position = configuration?.position ?? { x: 0, y: 0, z: 0 };
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

    this.container!.addChild(this._sprite);
  }

  public show(): void {
    this.container!.alpha = 1;
  }

  public hide(): void {
    this.container!.alpha = 0;
  }

  public move({ x, y, z }: Vector3D): void {
    this._position = { x, y, z };
    this.container!.x = 32 * x - 32 * y - 0.75;
    this.container!.y = 16 * x + 16 * y - 32 * z - 19.25;

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
      this.container = undefined;
    }
  }
}
