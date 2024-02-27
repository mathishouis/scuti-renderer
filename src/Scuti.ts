import { Application, BaseTexture, Color, Container, extensions, SCALE_MODES, settings } from 'pixi.js';
import { GameObject } from './objects/GameObject';
import { register } from './utils/Assets';
import { Layer, Stage } from '@pixi/layers';
import { Configuration, ScutiConfiguration } from './ScutiConfiguration';
import { loadBundle } from './objects/parsers/BundleParser';
import { log } from './utils/Logger';
import { benchmark } from './utils/Benchmark';
import { loadData } from './objects/parsers/DataParser';
import { ScutiData } from './ScutiData';
import { Room } from '.';

export class Scuti {
  public configuration: ScutiConfiguration;
  public canvas!: ScutiConfiguration['canvas'];
  public application!: Application;
  public layer: Layer = new Layer();
  public data!: ScutiData;

  private _rooms: Room[] = [];

  constructor(configuration: Omit<Configuration, 'renderer'>) {
    log('🚀 SCUTI', 'v0.0.0');

    console.log(this.application);

    this.configuration = new ScutiConfiguration({ ...configuration, ...{ renderer: this } });
    this._initialize();
  }

  private _initialize(): void {
    const { perf } = benchmark('renderer');

    extensions.add(loadBundle);
    extensions.add(loadData);
    settings.ROUND_PIXELS = true;
    Container.defaultSortableChildren = false;
    BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

    this.application = new Application({
      view: this.configuration.canvas,
      width: this.configuration.width,
      height: this.configuration.height,
      antialias: false,
      autoDensity: true,
      resolution: Math.min(Math.round(devicePixelRatio ?? 1), 2),
      backgroundColor: new Color(this.configuration.backgroundColor).toHex(),
      backgroundAlpha: this.configuration.backgroundAlpha,
      resizeTo: this.configuration.resizeTo,
      eventMode: 'passive',
    });

    this.configuration.preloadFn(this);
    this.application.stage = new Stage();
    this.layer.group.enableSort = true;
    this.application.stage.addChild(this.layer);

    perf();
  }

  public async load(): Promise<void> {
    const { perf } = benchmark('resources');

    await Promise.all([
      register('room/materials', '/bundles/room/materials.bundle'),
      register('room/content', '/bundles/room/content.bundle'),
      register('data/furnitures', '/data/furnitures.data'),
    ]);

    this.data = new ScutiData();

    perf();
  }

  public add(item: GameObject): void {
    item.renderer = this;
    item.render();

    if (item instanceof Room) {
      this._rooms.push(item);
    }
  }

  public get rooms(): Room[] {
    return this.rooms;
  }
}
