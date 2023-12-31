import { BLEND_MODES, Sprite } from 'pixi.js';
import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector';

interface Configuration {
  furniture: RoomFurniture;
  id: number;
  frame: number;
  alpha: number;
  tint: number;
  offsets: Vector3D;
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
  public offsets: Vector3D;
  public blend: BLEND_MODES;
  public flip: boolean;
  public interactive: boolean;
  public tag: string;
  public sprite!: Sprite;

  constructor({ furniture, id, frame, alpha, tint, offsets, blend, flip, interactive, tag }: Configuration) {
    this.furniture = furniture;
    this.id = id;
    this.frame = frame;
    this.alpha = alpha;
    this.tint = tint;
    this.offsets = offsets;
    this.blend = blend;
    this.flip = flip;
    this.interactive = interactive;
    this.tag = tag;
  }

  public render(): void {
    this.sprite = new Sprite(this.furniture.visualization.getLayerTexture(this.id));
    this.sprite.parentLayer = this.furniture.room.renderer.layer;
    this.sprite.zOrder = 0;

    if (this.flip) this.sprite.scale.x = -1;
    if (this.offsets.x !== undefined) this.sprite.x += this.offsets.x;
    if (this.offsets.y !== undefined) this.sprite.y += this.offsets.y;
    if (this.offsets.z !== undefined) this.sprite.zOrder += this.offsets.z + 1000;
    if (this.alpha !== undefined) this.sprite.alpha = this.alpha;
    if (this.tint !== undefined) this.sprite.tint = this.tint;
    if (this.blend !== undefined) this.sprite.blendMode = this.blend;

    //this.sprite.tint = '#' + Math.random().toString(16).substr(-6);

    this.furniture.visualization.container.addChild(this.sprite);
  }

  public update({ furniture, id, frame, alpha, tint, offsets, blend, flip, interactive, tag }: Configuration): void {
    this.furniture = furniture;
    this.id = id;
    this.frame = frame;
    this.alpha = alpha;
    this.tint = tint;
    this.offsets = offsets;
    this.blend = blend;
    this.flip = flip;
    this.interactive = interactive;
    this.tag = tag;

    if (this.sprite === undefined) {
      this.sprite = new Sprite(this.furniture.visualization.getLayerTexture(this.id));
      this.sprite.parentLayer = this.furniture.room.renderer.layer;
      this.sprite.zOrder = 0;
      this.furniture.visualization.container.addChild(this.sprite);
    } else {
      this.sprite.texture = this.furniture.visualization.getLayerTexture(this.id);
    }

    if (this.flip) this.sprite.scale.x = -1;
    if (this.offsets.x !== undefined) this.sprite.x += this.offsets.x;
    if (this.offsets.y !== undefined) this.sprite.y += this.offsets.y;
    if (this.offsets.z !== undefined) this.sprite.zOrder! += this.offsets.z + 100000;
    if (this.alpha !== undefined) this.sprite.alpha = this.alpha;
    if (this.tint !== undefined) this.sprite.tint = this.tint;
    if (this.blend !== undefined) this.sprite.blendMode = this.blend;
  }

  public destroy(): void {
    if (this.sprite !== undefined) {
      this.sprite.destroy();
      this.sprite = undefined as any;
    }
  }
}
