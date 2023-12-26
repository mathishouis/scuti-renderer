import { BLEND_MODES, Sprite } from 'pixi.js';
import { RoomFurniture } from './RoomFurniture';
import { asset } from '../../../../utils/Assets';

interface Configuration {
  furniture: RoomFurniture;
  id: number;
  frame: number;
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
  public frame: number;
  public alpha: number;
  public tint: number;
  public z: number;
  public blend: BLEND_MODES;
  public flip: boolean;
  public interactive: boolean;
  public tag: string;
  public sprite!: Sprite;

  constructor({ furniture, id, frame, alpha, tint, z, blend, flip, interactive, tag }: Configuration) {
    this.furniture = furniture;
    this.id = id;
    this.frame = frame;
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
    const layerLetter = spritesheet.data.properties.layerCount === this.id ? 'sd' : String.fromCharCode(97 + Number(this.id));
    const name = `${this.furniture.data.name}_${layerLetter}_${this.furniture.direction}_${this.frame}`;

    this.sprite = new Sprite(spritesheet.textures[name]);
    this.sprite.parentLayer = this.furniture.room.renderer.layer;

    if (this.flip) this.sprite.scale.x = -1;
    if (this.z) this.sprite.zOrder = this.z;
    if (this.alpha) this.sprite.alpha = this.alpha;
    if (this.tint) this.sprite.tint = this.tint;
    if (this.blend) this.sprite.blendMode = this.blend;

    this.furniture.visualization.container.addChild(this.sprite);
  }

  public destroy(): void {
    this.sprite.destroy();
  }
}
