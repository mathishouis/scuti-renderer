import { Application, extensions, TextureStyle } from 'pixi.js';
import { GameObject } from './objects/GameObject';
import { register } from './utils/Assets';
import { Configuration, ScutiConfiguration } from './ScutiConfiguration';
import { loadBundle } from './objects/parsers/BundleParser';
import { log, perf } from './utils/Logger';
import { benchmark } from './utils/Benchmark';
import { loadData } from './objects/parsers/DataParser';
import { ScutiData } from './ScutiData';

export class Scuti {
  public configuration: ScutiConfiguration;
  public canvas!: HTMLElement;
  public application!: Application;
  public data!: ScutiData;

  constructor(configuration: Omit<Configuration, 'renderer'>) {
    log('🚀 SCUTI', 'v0.0.0');

    this.configuration = new ScutiConfiguration({ ...configuration, ...{ renderer: this } });
  }

  private async _initialize(): Promise<void> {
    benchmark('renderer');

    extensions.add(loadBundle);
    extensions.add(loadData);

    TextureStyle.defaultOptions.scaleMode = 'nearest';

    this.application = new Application();
    await this.application.init({
      width: this.configuration.width,
      height: this.configuration.height,
      antialias: false,
      autoDensity: true,
      resolution: Math.min(Math.round(devicePixelRatio ?? 1), 2),
      backgroundColor: this.configuration.backgroundColor,
      backgroundAlpha: this.configuration.backgroundAlpha,
      resizeTo: this.configuration.resizeTo,
      eventMode: 'passive',
      roundPixels: true,
    });

    globalThis.__PIXI_APP__ = this.application;
    this.canvas = this.configuration.canvas;
    this.canvas.append(this.application.canvas);

    perf('Renderer', 'renderer');
  }

  public async load(): Promise<void> {
    await this._initialize();

    benchmark('resources');

    await Promise.all([
      register('room/materials', '/bundles/room/materials.bundle'),
      register('room/content', '/bundles/room/content.bundle'),
      register('data/furnitures', '/data/furnitures.data'),
    ]);

    this.data = new ScutiData();

    perf('Resources', 'resources');
  }

  public add(item: GameObject): void {
    item.renderer = this;
    item.render();
  }
}
