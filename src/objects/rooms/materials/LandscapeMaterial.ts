import { asset } from '../../../utils/Assets';
import { Landscape, LandscapeSpritesheet } from '../parts/wall/landscapes/entities/Landscape';
import { LandscapeLayer } from '../parts/wall/landscapes/layers/LandscapeLayer';
import { LandscapeAnimatedLayer } from '../parts/wall/landscapes/layers/LandscapeAnimatedLayer.ts';

export class LandscapeMaterial {
  public layers: { layer: new (configuration: any) => LandscapeLayer; params: any }[] = [];

  constructor(public id: number) {
    this.initialize();
  }

  private _parse(layers: any): void {
    layers.forEach((layer: any) => {
      if (layer['color']) {
        /*this.layers.push({
          layer: LandscapeColorLayer,
          params: { color: layer['color'] },
        });*/
      } else if (layer['texture']) {
        /*this.layers.push({
          layer: LandscapeTextureLayer,
          params: { name: layer['texture'] },
        });*/
      } else if (layer['matrice']) {
        /*this.layers.push({
          layer: LandscapeMatriceLayer,
          params: { name: layer['matrice'] },
        });*/
      } else {
        this.layers.push({
          layer: LandscapeAnimatedLayer,
          params: { name: layer['animation'] },
        });
      }
    });
  }

  /*private _animated(layers: any): void {
    // todo(): parse animated layers... :D
  }*/

  public initialize(): void {
    const spritesheet: LandscapeSpritesheet = asset('room/materials');
    const { layers }: Landscape = spritesheet.data.materials.landscapes.data.find(
      (landscape: Landscape) => landscape.id === this.id,
    )!;

    this._parse(layers);
    //this._animated(layers.animated);
  }
}
