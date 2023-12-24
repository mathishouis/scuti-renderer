import { asset } from '../../../utils/Assets';
import { Landscape, LandscapeSpritesheet } from '../parts/wall/landscapes/entities/Landscape';
import { LandscapeLayer } from '../parts/wall/landscapes/layers/LandscapeLayer';
import { LandscapeAnimatedLayer } from '../parts/wall/landscapes/layers/LandscapeAnimatedLayer';
import { LandscapeColorLayer } from '../parts/wall/landscapes/layers/LandscapeColorLayer';
import { LandscapeTextureLayer } from '../parts/wall/landscapes/layers/LandscapeTextureLayer';
import { LandscapeMatriceLayer } from '../parts/wall/landscapes/layers/LandscapeMatriceLayer';

export class LandscapeMaterial {
  public layers: { layer: new (configuration: any) => LandscapeLayer; params: any }[] = [];
  public layerMap: Record<string, new (configuration: any) => LandscapeLayer> = {
    color: LandscapeColorLayer,
    texture: LandscapeTextureLayer,
    matrice: LandscapeMatriceLayer,
    animation: LandscapeAnimatedLayer,
  };

  constructor(public id: number) {
    this.initialize();
  }

  private _parse(layer: any): void {
    this.layers.push({
      layer: this.layerMap[layer.type],
      params: layer.values,
    });
  }

  public initialize(): void {
    const spritesheet: LandscapeSpritesheet = asset('room/materials');
    const { layers }: Landscape = spritesheet.data.materials.landscapes.data.find((landscape: Landscape) => landscape.id === this.id)!;

    layers.forEach(layer => this._parse(layer));
  }
}
