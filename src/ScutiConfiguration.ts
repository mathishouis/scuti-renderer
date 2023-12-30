import { Scuti } from './Scuti';
import { Color } from 'pixi.js';
import { registerPath } from './utils/Assets';

interface Configuration {
  renderer: Scuti;
  canvas: HTMLElement;
  width: number;
  height: number;
  resources: string;
  backgroundColor?: number;
  backgroundAlpha?: number;
  resizeTo?: HTMLElement | Window;
}
export class ScutiConfiguration {
  public renderer: Scuti;

  private _canvas: HTMLElement;
  private _width: number;
  private _height: number;
  private _backgroundColor: number;
  private _backgroundAlpha: number;
  private _resizeTo: HTMLElement | Window | undefined;

  constructor({ canvas, width, height, backgroundColor, backgroundAlpha, resizeTo, resources, renderer }: Configuration) {
    this.renderer = renderer;

    this._canvas = canvas;
    this._width = width;
    this._height = height;
    this._backgroundColor = backgroundColor ?? 0x000000;
    this._backgroundAlpha = backgroundAlpha ?? 1;
    this._resizeTo = resizeTo;

    registerPath(resources);
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
    this.renderer.application.resizeTo = element;
  }
}
