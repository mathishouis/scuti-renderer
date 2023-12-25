import { Application, BaseTexture, Color, Container, extensions, SCALE_MODES, settings, Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { GameObject } from './objects/GameObject';
import { register } from './utils/Assets';
import { Layer, Stage } from '@pixi/layers';
import { addStats, StatsJSAdapter } from 'pixi-stats';
import { ScutiConfiguration } from './ScutiConfiguration';
import { loadBundle } from './objects/bundles/BundleParser';
import { log, perf } from './utils/Logger';
import { benchmark } from './utils/Benchmark';
import { loadData } from './objects/bundles/DataParser';
import { ScutiData } from './ScutiData';

interface Configuration {
  canvas: HTMLElement;
  width: number;
  height: number;
  resources: string;
  backgroundColor?: number;
  backgroundAlpha?: number;
  resizeTo?: HTMLElement | Window;
}

export class Scuti {
  public configuration: ScutiConfiguration;
  public canvas!: HTMLElement;
  public application!: Application;
  public layer: Layer = new Layer();
  public data!: ScutiData;

  constructor(configuration: Configuration) {
    log('🚀 SCUTI', 'v0.0.0');

    this.configuration = new ScutiConfiguration({ ...configuration, ...{ renderer: this } });
    this._initialize();
  }

  private _initialize(): void {
    benchmark('renderer');
    // Pixi settings
    extensions.add(loadBundle);
    extensions.add(loadData);
    settings.RESOLUTION = 1;
    Container.defaultSortableChildren = true;
    BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

    // Application
    this.application = new Application({
      width: this.configuration.width,
      height: this.configuration.height,
      resolution: 1,
      antialias: false,
      backgroundColor: new Color(this.configuration.backgroundColor ?? 0x0c567c).toHex(),
      backgroundAlpha: this.configuration.backgroundAlpha ?? 1,
      resizeTo: this.configuration.resizeTo,
    });
    this.application.stage = new Stage();
    (globalThis as any).__PIXI_APP__ = this.application; // Support for PIXI.js dev-tool.
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
      register('room/materials', '/room/materials.bundle'),
      register('room/cursor', '/room/cursor/cursor.json'),
      register('room/door', '/room/door/door.png'),
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
