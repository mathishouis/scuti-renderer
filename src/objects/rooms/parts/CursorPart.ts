import { RoomPart } from './RoomPart.ts';
import { Room } from '../Room.ts';
import { Container, Sprite, Texture } from 'pixi.js';
import { EventManager } from '../../events/EventManager.ts';
import { AssetLoader } from '../../assets/AssetLoader.ts';
import { ICursorConfiguration } from '../../../interfaces/ICursorConfiguration.ts';
import { Vector3D } from '../../../types/Vector.ts';

export class CursorPart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager!: EventManager;

  constructor(public configuration: ICursorConfiguration) {
    super();
  }

  public render(): void {
    const texture: Texture = AssetLoader.get('room/cursor').textures['tile_cursor_64_a_0_0.png'];
    const sprite: Sprite = new Sprite(texture);
    this.container.addChild(sprite);

    this.room.visualization.container.addChild(this.container);
  }

  public show(): void {
    this.container.alpha = 1;
  }

  public hide(): void {
    this.container.alpha = 0;
  }

  public move({ x, y, z }: Vector3D): void {
    this.configuration.position = { x, y, z };
    this.container.x = 32 * x - 32 * y;
    this.container.y = 16 * x + 16 * y - 32 * z - 20;
  }
}
