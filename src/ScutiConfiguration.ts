import { Scuti } from './Scuti';
import { Color } from 'pixi.js';
import { registerPath } from './utils/Assets';
import { Vector2D } from '.';

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
  camera?: Partial<CameraConfiguration>;
  preload?: (app: Scuti['application']) => void;
}

type Require<T> = {
  [K in keyof T]: T[K] extends object ? Required<T[K]> : T[K];
};

interface ZoomConfiguration {
  wheel: boolean;
  level: number;
  min: number;
  max: number;
  step: number;
  duration: number;
  direction: 'cursor' | 'center';
}

interface CameraConfiguration {
  center: boolean;
  position: Partial<Vector2D>;
}

export class ScutiConfiguration {
  public renderer: Scuti;

  private _canvas: Configuration['canvas'];
  private _width: NonNullable<Configuration['width']>;
  private _height: NonNullable<Configuration['height']>;
  private _backgroundColor: NonNullable<Configuration['backgroundColor']>;
  private _backgroundAlpha: NonNullable<Configuration['backgroundAlpha']>;
  private _resizeTo: NonNullable<Configuration['resizeTo']>;
  private _preload: Configuration['preload'];
  private _zoom: Require<ZoomConfiguration>;
  private _camera: Require<CameraConfiguration>;

  constructor({
    canvas,
    width,
    height,
    backgroundColor,
    backgroundAlpha,
    resizeTo,
    resources,
    renderer,
    preload,
    zoom,
    camera,
  }: Configuration) {
    this.renderer = renderer;

    this._canvas = canvas;
    this._width = width ?? window.innerWidth;
    this._height = height ?? window.innerHeight;
    this._backgroundColor = backgroundColor ?? 0x000000;
    this._backgroundAlpha = backgroundAlpha ?? 1;
    this._resizeTo = resizeTo ?? window;
    this._zoom = { wheel: true, level: 2, min: 0.5, max: 8, step: 0.5, duration: 0.125, direction: 'center', ...zoom };
    this._camera = { center: true, ...camera, position: { x: 0, y: 0, ...camera?.position } };
    this._preload = preload;

    registerPath(resources);
  }

  public preloadFn(app: Scuti): void {
    if (this._preload == undefined) return;
    this._preload(app.application);
  }

  public get canvas(): Configuration['canvas'] {
    return this._canvas;
  }

  public set canvas(element: typeof this._canvas) {
    this._canvas = element;
    this.renderer.canvas = element;
    this.renderer.canvas.append(this.renderer.application.view as HTMLCanvasElement);
  }

  public get width(): typeof this._width {
    return this._width;
  }

  public set width(width: typeof this._width) {
    this._width = width;
    this.renderer.application.renderer.view.width = width;
  }

  public get height(): typeof this._height {
    return this._height;
  }

  public set height(height: typeof this._height) {
    this._height = height;
    this.renderer.application.renderer.view.height = height;
  }

  public get backgroundColor(): typeof this._backgroundColor {
    return this._backgroundColor;
  }

  public set backgroundColor(color: typeof this._backgroundColor) {
    this._backgroundColor = color;
    this.renderer.application.renderer.background.color = new Color(color);
  }

  public get backgroundAlpha(): typeof this._backgroundAlpha {
    return this._backgroundAlpha;
  }

  public set backgroundAlpha(alpha: typeof this._backgroundAlpha) {
    this._backgroundAlpha = alpha;
    this.renderer.application.renderer.background.alpha = alpha;
  }

  public get resizeTo(): typeof this._resizeTo {
    return this._resizeTo;
  }

  public set resizeTo(element: typeof this._resizeTo) {
    this.renderer.application.resizeTo = element;
  }

  public get zoom(): typeof this._zoom {
    return this._zoom;
  }

  public set zoom(zoom: typeof this._zoom) {
    this._zoom = zoom;
  }

  public get camera(): typeof this._camera {
    return this._camera;
  }

  public set camera(camera: typeof this._camera) {
    this._camera = camera;
  }
}
