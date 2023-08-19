import { Application, BaseTexture, Container, SCALE_MODES, settings } from "pixi.js";
import { IRendererConfiguration } from "./interfaces/IRendererConfiguration.ts";
import { GameObject } from "./objects/GameObject.ts";
import { AssetLoader } from "./objects/assets/AssetLoader.ts";
import {Layer, Stage} from "@pixi/layers";

export class Scuti {
    public canvas!: HTMLElement;
    public application!: Application;
    public layer: Layer = new Layer();

    constructor(
        private _configuration: IRendererConfiguration
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
            antialias: false,
            backgroundColor: this._configuration.backgroundColor ?? 0x0C567C,
            backgroundAlpha: this._configuration.backgroundAlpha ?? 1
        });
        this.application.stage = new Stage();
        (globalThis as any).__PIXI_APP__ = this.application; // Support for PIXI.js dev-tool.
        this.canvas = this._configuration.canvas;
        this.canvas.append(this.application.view as HTMLCanvasElement);

        this.layer.group.enableSort = true;
        this.application.stage.addChild(this.layer);
    }

    public async load(): Promise<void> {
        await Promise.all([
            AssetLoader.load("room/materials/floor", "/room/materials/floor/floor.json"),
            AssetLoader.load("room/cursor", "/room/cursor/cursor.json")
        ])
        for (const material of AssetLoader.get("room/materials/floor")) {
            await AssetLoader.load(`room/materials/floor/${material.texture}`, `/room/materials/floor/textures/${material.texture}.png`);
        }

    }

    public add(item: GameObject): void {
        item.renderer = this;
        item.render();
    }
}
