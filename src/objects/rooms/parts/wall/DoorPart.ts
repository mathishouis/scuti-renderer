import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';
import { Container, Sprite } from 'pixi.js';
import { EventManager } from '../../../events/EventManager';
import { Vector3D } from '../../../../types/Vector';
import { asset } from '../../../../utils/Assets';

interface Configuration {
  position: Vector3D;
  thickness: number;
  floorThickness: number;
}

export class DoorPart extends RoomPart {
  public room!: Room;
  public container: Container | undefined = new Container();
  public eventManager: EventManager = new EventManager();
  public sprite: Sprite | undefined;

  constructor(public configuration: Configuration) {
    super();
  }

  public render(): void {
    this.sprite = new Sprite(asset('room/content').textures['door']);
    this.sprite.skew.set(0, -0.46);
    this.sprite.parentLayer = this.room.renderer.layer;
    this.sprite.zOrder = 1000000;
    this.sprite.tint = 0x000000;

    this.container!.x = 32 * (this.configuration.position.x + 1) - 32 * this.configuration.position.y;
    this.container!.y =
      16 * (this.configuration.position.x + 1) +
      16 * this.configuration.position.y -
      32 * this.configuration.position.z -
      this.sprite.height +
      2;
    this.container!.addChild(this.sprite);
  }

  public destroy(): void {
    if (this.sprite != undefined) {
      this.sprite.destroy();
      this.sprite = undefined;
    }

    if (this.container != undefined) {
      this.container.destroy();
      this.container = undefined;
    }
  }
}
