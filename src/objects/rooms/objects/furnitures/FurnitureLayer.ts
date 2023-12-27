import { BLEND_MODES, Sprite } from 'pixi.js';
import { RoomFurniture } from './RoomFurniture';
import { Vector3D } from '../../../../types/Vector.ts';

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
    this.sprite.zOrder = this.furniture.visualization.getLayerZOffset(this.id);

    if (this.flip) this.sprite.scale.x = -1;
    if (this.offsets.x) this.sprite.x += this.offsets.x;
    if (this.offsets.y) this.sprite.y += this.offsets.y;
    if (this.offsets.z) this.sprite.zOrder += this.offsets.z + 1000;
    if (this.alpha) this.sprite.alpha = this.alpha;
    if (this.tint) this.sprite.tint = this.tint;
    if (this.blend) this.sprite.blendMode = this.blend;

    this.furniture.visualization.container.addChild(this.sprite);
  }

  public destroy(): void {
    this.sprite.destroy();
  }
}
