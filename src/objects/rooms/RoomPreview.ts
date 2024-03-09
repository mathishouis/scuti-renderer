import { Application } from 'pixi.js';

interface Configuration {
  canvas: HTMLElement;
  heightMap: string;
}

export class RoomPreview {
  private _canvas: Configuration['canvas'];
  private _application: Application;

  constructor(configuration: Configuration) {
    this._application = new Application({
      backgroundColor: 0x000000,
    });

    this._canvas = configuration.canvas;
    this._canvas.append(this._application.view as HTMLCanvasElement);
  }
}
