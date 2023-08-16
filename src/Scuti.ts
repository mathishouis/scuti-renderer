import { Application, BaseTexture, Container, SCALE_MODES, settings } from "pixi.js";
import { RendererConfiguration } from "./interfaces/RendererConfiguration.ts";
import { GameObject } from "./objects/GameObject.ts";
import { AssetLoader } from "./objects/assets/AssetLoader.ts";

export class Scuti {
    public canvas!: HTMLElement;
    public application!: Application;

    constructor(
        private _configuration: RendererConfiguration
    ) {
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
            width: this._configuration.width,
            height: this._configuration.height,
            resolution: 1,
            antialias: false
        });
        (globalThis as any).__PIXI_APP__ = this.application; // Support for PIXI.js dev-tool.
        this.canvas = this._configuration.canvas;
        this.canvas.append(this.application.view as HTMLCanvasElement);
    }

    public async load(): Promise<void> {
        await Promise.all([
            AssetLoader.load("rooms/materials/floor", "/rooms/materials/floor/materials.json")
        ])
        for (const material of AssetLoader.get("rooms/materials/floor")) {
            await AssetLoader.load(`rooms/materials/floor/${material.texture}`, `/rooms/materials/floor/textures/${material.texture}.png`);
        }

    }

    public add(item: GameObject): void {
        item.renderer = this;
        item.render();
    }
}
