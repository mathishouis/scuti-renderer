import { Scuti } from './Scuti';
import { Color } from 'pixi.js';
import { registerPath } from './utils/Assets';

export interface Configuration {
  renderer: Scuti;
  resources: string;
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  resizeTo?: HTMLElement | Window;
  zoom?: Partial<ZoomConfiguration>;
  preload?: (app: Scuti['application']) => void;
}

interface ZoomConfiguration {
  wheel: boolean;
  level: number;
  min: number;
  max: number;
  step: number;
  duration: number;
  direction: 'cursor' | 'center';
}

export class ScutiConfiguration {
  public renderer: Scuti;

  private _canvas: Configuration['canvas'];
  private _width: Configuration['width'];
  private _height: Configuration['height'];
  private _backgroundColor: Configuration['backgroundColor'];
  private _backgroundAlpha: Configuration['backgroundAlpha'];
  private _resizeTo: Configuration['resizeTo'];
  private _preload: Configuration['preload'];
  private _zoom: Configuration['zoom'];

  constructor({ canvas, width, height, backgroundColor, backgroundAlpha, resizeTo, resources, renderer, preload, zoom }: Configuration) {
    this.renderer = renderer;

    this._canvas = canvas;
    this._width = width ?? window.innerWidth;
    this._height = height ?? window.innerHeight;
    this._backgroundColor = backgroundColor ?? 0x000000;
    this._backgroundAlpha = backgroundAlpha ?? 1;
    this._resizeTo = resizeTo ?? window;
    this._zoom = { wheel: true, level: 2, min: 0.5, max: 8, step: 0.5, duration: 0.125, direction: 'center', ...zoom };
    this._preload = preload;

    registerPath(resources);
  }

  public get canvas(): Configuration['canvas'] {
    return this._canvas;
  }

  public set canvas(element: Configuration['canvas']) {
    this._canvas = element;
    this.renderer.canvas = element;
    this.renderer.canvas.append(this.renderer.application.view as HTMLCanvasElement);
  }

  public get width(): Configuration['width'] {
    return this._width;
  }

  public set width(width: NonNullable<Configuration['width']>) {
    this._width = width;
    this.renderer.application.renderer.view.width = width;
  }

  public get height(): Configuration['height'] {
    return this._height;
  }

  public set height(height: NonNullable<Configuration['height']>) {
    this._height = height;
    this.renderer.application.renderer.view.height = height;
  }

  public get backgroundColor(): Configuration['backgroundColor'] {
    return this._backgroundColor;
  }

  public set backgroundColor(color: NonNullable<Configuration['backgroundColor']>) {
    this._backgroundColor = color;
    this.renderer.application.renderer.background.color = new Color(color);
  }

  public get backgroundAlpha(): Configuration['backgroundAlpha'] {
    return this._backgroundAlpha;
  }

  public set backgroundAlpha(alpha: NonNullable<Configuration['backgroundAlpha']>) {
    this._backgroundAlpha = alpha;
    this.renderer.application.renderer.background.alpha = alpha;
  }

  public get resizeTo(): Configuration['resizeTo'] {
    return this._resizeTo;
  }

  public set resizeTo(element: NonNullable<Configuration['resizeTo']>) {
    this.renderer.application.resizeTo = element;
  }

  public preloadFn(app: Scuti): void {
    this._preload?.(app.application);
  }

  public get zoom(): Configuration['zoom'] {
    return this._zoom;
  }

  public set zoom(zoom: Configuration['zoom']) {
    this._zoom = zoom;
  }
}
