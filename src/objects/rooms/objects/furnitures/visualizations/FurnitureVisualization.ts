import { RoomObjectVisualization } from '../../RoomObjectVisualization';
import { asset } from '../../../../../utils/Assets';
import { FurnitureLayer } from '../FurnitureLayer';
import { BLEND_MODES } from '@pixi/constants';
import { RoomFurniture } from '../RoomFurniture';

interface Configuration {
  furniture: RoomFurniture;
}

export class FurnitureVisualization extends RoomObjectVisualization {
  public furniture: RoomFurniture;
  public layers: Map<number, FurnitureLayer> = new Map();
  public frames: Map<number, number> = new Map();

  constructor({ furniture }: Configuration) {
    super();

    this.furniture = furniture;
  }

  public render(): void {
    const key = `furnitures/${this.furniture.data.name}`;
    const spritesheet = asset(key);

    for (let i = 0; i < spritesheet.data.properties.layerCount + 1; i++) this.layer(i);
  }

  public layer(id: number): void {
    const key = `furnitures/${this.furniture.data.name}`;
    const spritesheet = asset(key);
    const { frames, properties } = spritesheet.data;
    const { colors, directions, layers, animations } = properties;

    if (!directions.includes(this.furniture.direction)) this.furniture.direction = this.furniture.data.direction ?? directions[0];

    const animation = animations.find((animation: any) => animation.state === this.furniture.state);
    const color = colors.find((color: any) => color.id === this.furniture.data.colorId);

    let tint = 0xffffff;
    let frame = 0;

    if (animation) {
      const animationLayer = animation.layers.find((layer: any) => layer.id === id);
      if (animationLayer && animationLayer.frames) {
        if (!this.frames.get(id)) this.frames.set(id, 0);
        frame = animationLayer.frames[this.frames.get(id) ?? 0];
      }
    }

    if (color) {
      const colorLayer = color.layers.find((layer: any) => layer.id === id);

      if (colorLayer && colorLayer.color) tint = Number(`0x${colorLayer.color}`);
    }

    const layerLetter = properties.layerCount === id ? 'sd' : String.fromCharCode(97 + Number(id));
    const name = `${this.furniture.data.name}_${layerLetter}_${this.furniture.direction}_${frame}`;
    const flipped = frames[name] ? frames[name].flipped ?? false : false;
    const layer = layers.find((layer: any) => layer.id === id);
    const z = layer?.z ?? 0;
    const blend = layer?.ink ? BLEND_MODES[layer.ink] : undefined;
    const interactive = layer?.interactive ?? true;
    const alpha = layerLetter === 'sd' ? 0.2 : layer?.alpha / 255 ?? 0;
    const tag = layer?.tag;

    if (layerLetter === 'sd') console.log(name);

    const furnitureLayer = new FurnitureLayer({
      furniture: this.furniture,
      id: id,
      frame: frame,
      alpha: alpha,
      tint: tint,
      z: z,
      blend: blend as any,
      flip: flipped,
      interactive: interactive,
      tag: tag,
    });
    furnitureLayer.render();

    this.layers.set(id, furnitureLayer);
  }

  public next(): void {
    const key = `furnitures/${this.furniture.data.name}`;
    const spritesheet = asset(key);
    const { animations, layerCount } = spritesheet.data.properties;

    for (let i = 0; i < layerCount; i++) {
      const animation = animations.find((animation: any) => animation.state === this.furniture.state);

      if (animation) {
        const animationLayer = animation.layers.find((layer: any) => layer.id === i);

        if (animationLayer && animationLayer.frames) {
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
  }
  public update(): void {}
  public destroy(): void {}
}
