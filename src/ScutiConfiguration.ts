import { Scuti } from "./Scuti.ts";
import { IRendererConfiguration } from "./interfaces/IRendererConfiguration.ts";
import { Color } from "pixi.js";

export class ScutiConfiguration {
    private _canvas!: HTMLElement;
    private _width!: number;
    private _height!: number;
    private _backgroundColor!: number;
    private _backgroundAlpha!: number;
    private _resizeTo!: HTMLElement | Window | undefined;

    constructor(
        public renderer: Scuti,
        configuration: IRendererConfiguration
    ) {
        this._canvas = configuration.canvas;
        this._width = configuration.width;
        this._height = configuration.height;
        this._backgroundColor = configuration.backgroundColor ?? 0x000000;
        this._backgroundAlpha = configuration.backgroundAlpha ?? 1;
        this._resizeTo = configuration.resizeTo;
    }

    public get canvas(): HTMLElement {
        return this._canvas;
    }

    public set canvas(element: HTMLElement) {
        this._canvas = element;
        this.renderer.canvas = element;
        this.renderer.canvas.append(this.renderer.application.view as HTMLCanvasElement);
    }

    public get width(): number {
        return this._width;
    }

    public set width(width: number) {
        this._width = width;
        this.renderer.application.renderer.view.width = width;
    }

    public get height(): number {
        return this._height;
    }

    public set height(height: number) {
        this._height = height;
        this.renderer.application.renderer.view.height = height;
    }

    public get backgroundColor(): number {
        return this._backgroundColor;
    }

    public set backgroundColor(color: number) {
        this._backgroundColor = color;
        this.renderer.application.renderer.background.color = new Color(color);
    }

    public get backgroundAlpha(): number {
        return this._backgroundAlpha;
    }

    public set backgroundAlpha(alpha: number) {
        this._backgroundAlpha = alpha;
        this.renderer.application.renderer.background.alpha = alpha;
    }

    public get resizeTo(): HTMLElement | Window | undefined {
        return this._resizeTo;
    }

    public set resizeTo(element: HTMLElement | Window) {
        console.log("cc");
        this.renderer.application.resizeTo = element;
    }

}
