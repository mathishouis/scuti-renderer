import { Application, BaseTexture, Color, Container, SCALE_MODES, settings, Ticker, UPDATE_PRIORITY } from "pixi.js";
import { IRendererConfiguration } from "./interfaces/IRendererConfiguration.ts";
import { GameObject } from "./objects/GameObject.ts";
import { AssetLoader } from "./objects/assets/AssetLoader.ts";
import { Layer, Stage} from "@pixi/layers";
import { addStats, StatsJSAdapter } from "pixi-stats";
import { ScutiConfiguration } from "./ScutiConfiguration.ts";

export class Scuti {
    public configuration!: ScutiConfiguration;
    public canvas!: HTMLElement;
    public application!: Application;
    public layer: Layer = new Layer();

    constructor(
        configuration: IRendererConfiguration
    ) {
        this.configuration = new ScutiConfiguration(this, configuration);

        this._initializePixi();
        this._initializeCanvas();
    }

    private _initializePixi(): void {
        settings.RESOLUTION = 1;
        Container.defaultSortableChildren = true;
        BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
    }

    private _initializeCanvas(): void {
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
    }

    public async load(): Promise<void> {
        await Promise.all([
            AssetLoader.load("room/materials/floor", "/room/materials/floor/floor.json"),
            AssetLoader.load("room/materials/wall", "/room/materials/wall/wall.json"),
            AssetLoader.load("room/cursor", "/room/cursor/cursor.json")
        ]);
        for (const material of AssetLoader.get("room/materials/floor")) {
            await AssetLoader.load(`room/materials/floor/${material.texture}`, `/room/materials/floor/textures/${material.texture}.png`);
        }
        for (const material of AssetLoader.get("room/materials/wall")) {
            await AssetLoader.load(`room/materials/wall/${material.texture}`, `/room/materials/wall/textures/${material.texture}.png`);
        }

    }

    public add(item: GameObject): void {
        item.renderer = this;
        item.render();
    }
}
