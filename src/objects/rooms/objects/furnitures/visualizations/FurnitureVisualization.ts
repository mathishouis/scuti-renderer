import { RoomObjectVisualization } from '../../RoomObjectVisualization';
import { asset } from '../../../../../utils/Assets';
import { FurnitureLayer } from '../FurnitureLayer';
import { BLEND_MODES } from '@pixi/constants';
import { RoomFurniture } from '../RoomFurniture';
import { Texture } from 'pixi.js';

interface Configuration {
  furniture: RoomFurniture;
}

// todo(): set in cache all the properties
export class FurnitureVisualization extends RoomObjectVisualization {
  public furniture: RoomFurniture;
  public layers: Map<number, FurnitureLayer> = new Map();
  // todo(): move everything in another class
  public frames: Map<number, number> = new Map();
  public framesRepeat: Map<number, number> = new Map();
  public loopsCount: Map<number, number> = new Map();

  constructor({ furniture }: Configuration) {
    super();

    this.furniture = furniture;
  }

  public render(): void {
    const spritesheet = asset(this.getAssetName());

    for (let i = 0; i < spritesheet.data.properties.layerCount + 1; i++) this.layer(i);
  }

  public layer(id: number): void {
    const spritesheet = asset(this.getAssetName());
    const { frames, properties } = spritesheet.data;
    const { directions, layers } = properties;

    if (!directions.includes(this.furniture.direction)) this.furniture.direction = this.furniture.data.direction ?? directions[0] ?? 0;

    const name = this.getLayerName(id);
    const flipped = frames[name] ? frames[name].flipped ?? false : false;
    const layer = layers.find((layer: any) => layer.id === id);
    const z = layer?.z ?? 0;
    const blend = layer?.ink ? BLEND_MODES[layer.ink] : undefined;
    const interactive = layer?.interactive ?? true;
    const alpha = name.includes('_sd_') ? 0.2 : layer?.alpha / 255 ?? 0;

    const furnitureLayer = new FurnitureLayer({
      furniture: this.furniture,
      id: id,
      frame: this.getLayerFrame(id),
      alpha: alpha,
      tint: this.getLayerColor(id),
      z: z,
      blend: blend as any,
      flip: flipped,
      interactive: interactive,
      tag: this.getLayerTag(id),
    });
    furnitureLayer.render();

    this.layers.set(id, furnitureLayer);
  }

  public next(): void {
    const spritesheet = asset(this.getAssetName());
    const { animations, layerCount } = spritesheet.data.properties;

    for (let i = 0; i < layerCount; i++) {
      const animation = animations.find((animation: any) => animation.state === this.furniture.state);

      if (animation) {
        const animationLayer = animation.layers.find((layer: any) => layer.id === i);

        if (animationLayer && animationLayer.frames) {
          if (animationLayer.frameRepeat) {
            if (this.framesRepeat.get(i) === undefined) {
              this.framesRepeat.set(i, 0);
            } else {
              if (this.framesRepeat.get(i) === animationLayer.frameRepeat) {
                this.framesRepeat.set(i, 0);
              } else {
                this.framesRepeat.set(i, (this.framesRepeat.get(i) ?? 0) + 1);
                continue;
              }
            }
          }

          const frames = animationLayer.frames;
          const frame = this.frames.get(i) ?? 0;

          if (frames.length > 1) {
            if (frames.length - 1 > frame) {
              this.frames.set(i, frame + 1);
            } else {
              this.frames.set(i, 0);
            }

            this.layers.get(i)?.destroy();
            this.layer(i);
          }
        }
      }
    }

    this.updateState();
  }
  public update(): void {}
  public destroy(): void {}

  public reset(): void {
    this.layers.forEach((layer: FurnitureLayer) => layer.destroy());
    this.layers = new Map();
    this.frames = new Map();
    this.framesRepeat = new Map();
    this.loopsCount = new Map();
    this.render();
  }

  public getLayerColor(id: number): number {
    const spritesheet = asset(this.getAssetName());
    const { colors } = spritesheet.data.properties;
    const color = colors.find((color: any) => color.id === this.furniture.data.colorId);

    if (color) {
      const colorLayer = color.layers.find((layer: any) => layer.id === id);
      if (colorLayer && colorLayer.color) return Number(`0x${colorLayer.color}`);
    }

    return 0xffffff;
  }

  public getLayerTag(id: number): string {
    const spritesheet = asset(this.getAssetName());
    const { layers } = spritesheet.data.properties;
    const layer = layers.find((layer: any) => layer.id === id);

    if (layer && layer.tag) return layer.tag;

    return '';
  }

  public getLayerFrame(id: number): number {
    const spritesheet = asset(this.getAssetName());
    const { animations } = spritesheet.data.properties;
    const animation = animations.find((animation: any) => animation.state === this.furniture.state);

    if (animation) {
      const animationLayer = animation.layers.find((layer: any) => layer.id === id);
      if (animationLayer && animationLayer.frames) {
        if (!this.frames.get(id)) this.frames.set(id, 0);
        return animationLayer.frames[this.frames.get(id) ?? 0];
      }
    }

    return 0;
  }

  public getLayerName(id: number): string {
    const spritesheet = asset(this.getAssetName());
    const { layerCount } = spritesheet.data.properties;

    const layerLetter = layerCount === id ? 'sd' : String.fromCharCode(97 + Number(id));
    return `${this.furniture.data.name}_${layerLetter}_${this.furniture.direction}_${this.getLayerFrame(id)}`;
  }

  public getLayerTexture(id: number): Texture {
    const spritesheet = asset(this.getAssetName());

    return spritesheet.textures[this.getLayerName(id)];
  }

  public getAssetName(): string {
    return `furnitures/${this.furniture.data.name}`;
  }

  public setState(id: number): void {
    this.furniture.state = id;
  }

  public updateState(): number {
    return 0;
  }
}
