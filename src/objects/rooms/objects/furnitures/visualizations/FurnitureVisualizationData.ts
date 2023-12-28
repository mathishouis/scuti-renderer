import { Vector3D } from '../../../../../types/Vector';
import { FurnitureVisualization } from './FurnitureVisualization';
import { BLEND_MODES, Spritesheet } from 'pixi.js';
import { asset } from '../../../../../utils/Assets';

interface CachedLayer {
  frames: number[];
  frameIndex: number;
  loopCount: number;
  currentLoopCount: number;
  frameRepeat: number;
  currentFrameRepeat: number;
  color: number;
  tag: string;
  alpha: number;
  interactive: boolean;
  flipped: boolean;
  blend: BLEND_MODES | undefined;
  offsets: Vector3D;
  directions: number[];
  needUpdate: boolean;
}

interface Configuration {
  visualization: FurnitureVisualization;
}

export class FurnitureVisualizationData {
  public visualization: FurnitureVisualization;
  public layers: Map<number, CachedLayer> = new Map();
  public spritesheet!: Spritesheet;

  constructor({ visualization }: Configuration) {
    this.visualization = visualization;

    this._initialize();
  }

  private _initialize(): void {
    this.spritesheet = asset(this.visualization.getAssetName());

    for (let i = 0; i < this.layerCount + 1; i++) this.register(i);
  }

  public update(): void {
    this.layers = new Map();

    for (let i = 0; i < this.layerCount + 1; i++) this.register(i);
  }

  public reset(): void {
    this.layers = new Map();
    this._initialize();
  }

  public register(layerId: number): void {
    const { furniture } = this.visualization;
    const { colorId } = furniture.data;
    const { frames, properties } = this.spritesheet.data as any;
    const { colors, layers, animations, layerCount } = properties;
    const letter = layerId == layerCount ? 'sd' : String.fromCharCode(97 + layerId);
    const name = `${furniture.data.name}_${letter}_${furniture.direction}_0`;
    const layer = {
      frames: [],
      frameIndex: 0,
      loopCount: 0,
      currentLoopCount: 0,
      frameRepeat: 0,
      currentFrameRepeat: 0,
      color: 0xffffff,
      tag: '',
      alpha: 0,
      interactive: true,
      blend: undefined,
      flipped: false,
      offsets: {
        x: 0,
        y: 0,
        z: 0,
      },
      directions: [],
      needUpdate: true,
    };

    const colorProperty = colors.find(({ id }: any) => id === colorId);
    const layerProperty = layers.find(({ id }: any) => id === layerId);
    const animationProperty = animations.find(({ state }: any) => state === this.visualization.furniture.state);

    if (colorProperty) {
      const colorLayer = colorProperty.layers.find(({ id }: any) => id === layerId);
      if (colorLayer && colorLayer.color) layer.color = Number(`0x${colorLayer.color}`);
    }

    if (layerProperty && layerProperty.tag) layer.tag = layerProperty.tag;

    if (animationProperty) {
      const animationLayer = animationProperty.layers.find(({ id }: any) => id === layerId);
      if (animationLayer && animationLayer.frames) {
        layer.frames = animationLayer.frames;
        if (animationLayer.loopCount) layer.loopCount = animationLayer.loopCount;
        if (animationLayer.frameRepeat) layer.frameRepeat = animationLayer.frameRepeat;
      }
    }

    if (layerProperty && layerProperty.x) layer.offsets.x = layerProperty.x;
    if (layerProperty && layerProperty.y) layer.offsets.y = layerProperty.y;
    if (layerProperty && layerProperty.z) layer.offsets.z = layerProperty.z;
    if (layerProperty && layerProperty.alpha) layer.alpha = layerProperty.alpha / 255;
    if (layerProperty && layerProperty.interactive) layer.interactive = layerProperty.interactive;
    if (layerProperty && layerProperty.ink) layer.blend = BLEND_MODES[layerProperty.ink] as any;
    if (frames[name] && frames[name].flipped) layer.flipped = true;
    if (layerId == layerCount) layer.alpha = 0.2;

    this.layers.set(layerId, layer);
  }

  public get layerCount(): number {
    return (this.spritesheet.data as any).properties.layerCount;
  }

  public get directions(): number[] {
    return (this.spritesheet.data as any).properties.directions;
  }

  public setState(id: number): void {
    const { animations } = (this.spritesheet.data as any).properties;
    const animationProperty = animations.find(({ state }: any) => state === id);

    for (let i = 0; i < this.layerCount; i++)
      if (animationProperty) {
        const layer = this.layers.get(i);

        if (layer) {
          const animationLayer = animationProperty.layers.find(({ id }: any) => id === i);

          if (animationLayer && animationLayer.frames) {
            if (animationLayer.loopCount) layer.loopCount = animationLayer.loopCount;
            if (animationLayer.frameRepeat) layer.frameRepeat = animationLayer.frameRepeat;

            layer.frames = animationLayer.frames;
            layer.frameIndex = 0;
            layer.needUpdate = true;
          }
        }
      }
  }
}
