import {
    Application,
    BaseTexture,
    Color,
    Container,
    extensions,
    SCALE_MODES,
    settings,
    Ticker,
    UPDATE_PRIORITY
} from "pixi.js";
import { IRendererConfiguration } from "./interfaces/IRendererConfiguration.ts";
import { GameObject } from "./objects/GameObject.ts";
import { AssetLoader } from "./objects/assets/AssetLoader.ts";
import { Layer, Stage} from "@pixi/layers";
import { addStats, StatsJSAdapter } from "pixi-stats";
import { ScutiConfiguration } from "./ScutiConfiguration.ts";
import { loadBundle } from "./objects/bundles/BundleParser.ts";
import { log } from "./utils/Logger.ts";
import { benchmark } from "./utils/Benchmark.ts";

export class Scuti {
    public configuration!: ScutiConfiguration;
    public canvas!: HTMLElement;
    public application!: Application;
    public layer: Layer = new Layer();

    constructor(
        configuration: IRendererConfiguration
    ) {
        this.configuration = new ScutiConfiguration(this, configuration);

        log(`🚀 SCUTI`, `v0.0.0`);

        this._initializePixi();
        this._initializeCanvas();
    }

    private _initializePixi(): void {
        benchmark('pixi');
        extensions.add(loadBundle);
        settings.RESOLUTION = 1;
        Container.defaultSortableChildren = true;
        BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
        log(`🚀 SCUTI`, `Pixi initialized in ${ benchmark('pixi') }ms`);
    }

    private _initializeCanvas(): void {
        benchmark('canvas');
        this.application = new Application({
            width: this.configuration.width,
            height: this.configuration.height,
            resolution: 1,
            antialias: false,
            backgroundColor: new Color(this.configuration.backgroundColor ?? 0x0C567C).toHex(),
            backgroundAlpha: this.configuration.backgroundAlpha ?? 1,
            resizeTo: this.configuration.resizeTo
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
        log(`🚀 SCUTI`, `Canvas initialized in ${ benchmark('canvas') }ms`);
    }

    public async load(): Promise<void> {
        benchmark('resources');

        await Promise.all([
            AssetLoader.load("room/materials", "/room/materials.bundle"),
            AssetLoader.load("room/cursor", "/room/cursor/cursor.json"),
            AssetLoader.load("room/door", "/room/door/door.png")
        ]);

        log(`🚀 SCUTI`, `Resources loaded in ${ benchmark('resources') }ms`);
    }

    public add(item: GameObject): void {
        item.renderer = this;
        item.render();
    }
}
