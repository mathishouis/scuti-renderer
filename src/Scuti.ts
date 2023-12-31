import { Application, BaseTexture, Color, Container, extensions, SCALE_MODES, settings, Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { GameObject } from './objects/GameObject';
import { register } from './utils/Assets';
import { Layer, Stage } from '@pixi/layers';
import { addStats, StatsJSAdapter } from 'pixi-stats';
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
  public layer: Layer = new Layer();
  public data!: ScutiData;

  constructor(configuration: Omit<Configuration, 'renderer'>) {
    log('🚀 SCUTI', 'v0.0.0');

    this.configuration = new ScutiConfiguration({ ...configuration, ...{ renderer: this } });
    this._initialize();
  }

  private _initialize(): void {
    benchmark('renderer');
    // Pixi settings
    extensions.add(loadBundle);
    extensions.add(loadData);
    settings.ROUND_PIXELS = true;
    Container.defaultSortableChildren = true;
    BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

    // Application
    this.application = new Application({
      width: this.configuration.width,
      height: this.configuration.height,
      antialias: false,
      autoDensity: true,
      resolution: Math.min(Math.round(devicePixelRatio ?? 1), 2),
      backgroundColor: new Color(this.configuration.backgroundColor).toHex(),
      backgroundAlpha: this.configuration.backgroundAlpha,
      resizeTo: this.configuration.resizeTo,
    });
    this.application.stage = new Stage();
    globalThis.__PIXI_APP__ = this.application; // Support for PIXI.js dev-tool.
    this.canvas = this.configuration.canvas;
    this.canvas.append(this.application.view as HTMLCanvasElement);

    // Pixi stats
    const stats: StatsJSAdapter = addStats(document, this.application);
    const ticker: Ticker = Ticker.shared;

    ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

    this.layer.group.enableSort = true;
    this.application.stage.addChild(this.layer);
    perf('Renderer', 'renderer');
  }

  public async load(): Promise<void> {
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
