import { RoomLayer } from './RoomLayer';
import { Room } from '../Room';
import { LandscapeWindowMask } from '../parts/wall/landscapes/layers/items/LandscapeWindowMask';
import { LandscapePart } from '../parts/wall/landscapes/LandscapePart';
import { Container, Sprite } from 'pixi.js';
import { Layer } from '@pixi/layers';
import { BlackSpriteMaskFilter } from '../../filters/BlackSpriteMaskFilter';

export class MaskLayer extends RoomLayer {
  public childrens: LandscapeWindowMask[] = [];
  public container: Container = new Container();
  public sprite!: Sprite;

  constructor(public room: Room) {
    super();
  }

  public add(item: LandscapeWindowMask): void {
    const landscapeParts = this.room.visualization.layers.parts.childrens.filter(children => children instanceof LandscapePart);
    if (landscapeParts.length === 0) this.room.visualization.renderLandscapes();
    this.container.addChild(item.sprite);
    this.childrens.push(item);
    this.update();
  }

  public remove(item: LandscapeWindowMask): void {
    this.container.removeChild(item.sprite);
    this.childrens = this.childrens.filter((filteredItem: LandscapeWindowMask) => filteredItem !== item);
  }

  public destroy(): void {}

  public update(): void {
    if (this.sprite) {
      this.room.visualization.container.removeChild(this.sprite);
      this.sprite.destroy(true);
    }

    this.sprite = this.landscapeSprite();

    this.room.visualization.container.addChild(this.sprite);
    this.room.visualization.layers.parts.landscapes.filters = [new BlackSpriteMaskFilter(this.sprite)];
  }

  public landscapeSprite(): Sprite {
    const texture = this.room.renderer.application.renderer.generateTexture(this.container);
    const sprite = new Sprite(texture);

    sprite.x = this.container.getBounds().x;
    sprite.y = this.container.getBounds().y;

    return sprite;
  }
}
