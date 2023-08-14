import { Application, BaseTexture, Container, SCALE_MODES, settings } from "pixi.js";
import { RendererConfiguration } from "./interfaces/RendererConfiguration.ts";
import { GameObject } from "./objects/GameObject.ts";

export class Scuti {
    public canvas!: HTMLElement;
    public application!: Application;

    constructor(
        private _configuration: RendererConfiguration
    ) {
        this._initializePixi();
        this._initializeCanvas();
        this._initializeResources();
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

    private async _initializeResources(): Promise<void> {
        console.log("initializing resources...")
    }

    public add(object: GameObject): void {
        object.renderer = this;
        object.render();
    }
}