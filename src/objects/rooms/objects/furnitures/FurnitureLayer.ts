import { BLEND_MODES, Sprite } from 'pixi.js';
import { RoomFurniture } from './RoomFurniture.ts';
import { asset } from '../../../../utils/Assets.ts';

interface Configuration {
  furniture: RoomFurniture;
  id: number;
  alpha: number;
  tint: number;
  z: number;
  blend: BLEND_MODES;
  flip: boolean;
  interactive: boolean;
  tag: string;
}

export class FurnitureLayer {
  public furniture: RoomFurniture;
  public id: number;
  public alpha: number;
  public tint: number;
  public z: number;
  public blend: BLEND_MODES;
  public flip: boolean;
  public interactive: boolean;
  public tag: string;
  public sprite!: Sprite;

  constructor({ furniture, id, alpha, tint, z, blend, flip, interactive, tag }: Configuration) {
    this.furniture = furniture;
    this.id = id;
    this.alpha = alpha;
    this.tint = tint;
    this.z = z;
    this.blend = blend;
    this.flip = flip;
    this.interactive = interactive;
    this.tag = tag;
  }

  public render(): void {
    const key = `furnitures/${this.furniture.data.name}`;
    const spritesheet = asset(key);
    const layer = String.fromCharCode(97 + Number(this.id));
    const name = `${this.furniture.data.name}_64_${layer}_${this.furniture.direction}_${this.furniture.state}`;

    this.sprite = new Sprite(spritesheet.textures[name]);
    this.furniture.visualization.container.addChild(this.sprite);
  }
}
