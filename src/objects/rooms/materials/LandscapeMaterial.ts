import { asset } from '../../../utils/Assets.ts';
import { Landscape, LandscapeSpritesheet } from '../parts/wall/landscapes/entities/Landscape.ts';

export class LandscapeMaterial {
  public staticLayers: [] = [];
  public animatedLayers: [] = [];

  constructor(public id: number) {
    this.initialize();
  }

  public initialize(): void {
    const spritesheet: LandscapeSpritesheet = asset('room/materials');
    const { layers }: Landscape = spritesheet.data.materials.landscapes.data.find(
      (landscape: Landscape) => landscape.id === this.id,
    )!;

    this.animatedLayers = layers.animated;
    this.staticLayers = layers.static;
  }
}
