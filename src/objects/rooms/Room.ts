import { Scuti } from '../../Scuti';
import { RoomVisualization, UpdateConfiguration } from './RoomVisualization';
import { RoomCamera } from './RoomCamera';
import { GameObject } from '../GameObject';
import { RoomHeightmap } from './RoomHeightmap';
import { RoomEvents } from './RoomEvents';
import { RoomObject } from './objects/RoomObject';
import { FloorMaterial } from './materials/FloorMaterial';
import { WallMaterial } from './materials/WallMaterial';
import { LandscapeMaterial } from './materials/LandscapeMaterial';
import { RoomPreview } from './RoomPreview';

interface Configuration {
  heightMap: string;
  floorMaterial?: FloorMaterial;
  floorThickness?: number;
  floorHidden?: boolean;
  wallMaterial?: WallMaterial;
  wallThickness?: number;
  wallHeight?: number;
  wallHidden?: boolean;
  landscapeMaterial?: LandscapeMaterial;
  dragging?: boolean;
}

export class Room extends GameObject {
  public renderer!: Scuti;
  public parsedHeightMap!: RoomHeightmap;
  public visualization: RoomVisualization | undefined;
  public camera: RoomCamera | undefined;
  public events!: RoomEvents;
  public previewme!: RoomPreview;

  private _heightMap: string;
  private _floorMaterial: FloorMaterial;
  private _floorThickness: number;
  private _floorHidden: boolean;
  private _wallMaterial: WallMaterial;
  private _wallThickness: number;
  private _wallHidden: boolean;
  private _wallHeight: number;
  private _landscapeMaterial: LandscapeMaterial;
  private _dragging: boolean;

  constructor({
    heightMap,
    floorMaterial,
    floorThickness,
    floorHidden,
    wallMaterial,
    wallThickness,
    wallHeight,
    wallHidden,
    landscapeMaterial,
    dragging,
  }: Configuration) {
    super();

    this._heightMap = heightMap;
    this._floorMaterial = floorMaterial ?? new FloorMaterial(111);
    this._floorThickness = floorThickness ?? 8;
    this._floorHidden = floorHidden ?? false;
    this._wallMaterial = wallMaterial ?? new WallMaterial(101);
    this._wallThickness = wallThickness ?? 8;
    this._wallHidden = wallHidden ?? false;
    this._wallHeight = wallHeight ?? 0;
    this._landscapeMaterial = landscapeMaterial ?? new LandscapeMaterial(101);
    this._dragging = dragging ?? true;

    this._floorMaterial.room = this;
    this._wallMaterial.room = this;
  }

  public render(): void {
    this.parsedHeightMap = new RoomHeightmap(this.heightMap);
    this.visualization = new RoomVisualization(this);
    this.camera = new RoomCamera(this);
    this.events = new RoomEvents();
    //this.renderer.application.ticker.maxFPS = 144; todo(): Add configurable FPS

    this.visualization.render();
    this.renderer.application.stage.addChild(this.visualization.container);
  }

  public update({ parts, objects, cursor, mesher }: UpdateConfiguration): void {
    if (parts) this.parsedHeightMap = new RoomHeightmap(this.heightMap);

    this.visualization?.update({ parts, objects, cursor, mesher });
  }

  public destroy(): void {
    if (this.visualization != undefined) {
      this.visualization.destroy({ parts: true, objects: true, cursor: true });
      this.visualization = undefined;
    }

    if (this.camera != undefined) {
      this.camera.destroy();
      this.camera = undefined;
    }
  }

  public preview(canvas: HTMLElement): void {
    this.previewme = new RoomPreview({ canvas, heightMap: this._heightMap });
  }

  public add(object: RoomObject): void {
    this.visualization?.add(object);
  }

  public get heightMap(): string {
    return this._heightMap;
  }

  public set heightMap(heightMap: string) {
    this._heightMap = heightMap;
    this.update({
      parts: true,
      mesher: true,
    });
  }

  public get floorMaterial(): FloorMaterial {
    return this._floorMaterial;
  }

  public set floorMaterial(material: FloorMaterial) {
    this._floorMaterial.destroy();
    material.room = this;
    material.render();
    this._floorMaterial = material;
    this.update({
      parts: true,
    });
  }

  public get floorThickness(): number {
    return this._floorThickness;
  }

  public set floorThickness(thickness: number) {
    this._floorThickness = thickness;
    this.update({
      parts: true,
    });
  }

  public get floorHidden(): boolean {
    return this._floorHidden;
  }

  public set floorHidden(hidden: boolean) {
    this._floorHidden = hidden;
    this.update({
      parts: true,
    });
  }

  public get wallMaterial(): WallMaterial {
    return this._wallMaterial;
  }

  public set wallMaterial(material: WallMaterial) {
    this._wallMaterial.destroy();
    material.room = this;
    material.render();
    this._wallMaterial = material;
    this.update({
      parts: true,
    });
  }

  public get wallThickness(): number {
    return this._wallThickness;
  }

  public set wallThickness(thickness: number) {
    this._wallThickness = thickness;
    this.update({
      parts: true,
    });
  }

  public get wallHidden(): boolean {
    return this._wallHidden;
  }

  public set wallHidden(hidden: boolean) {
    this._wallHidden = hidden;
    this.update({
      parts: true,
    });
  }

  public get wallHeight(): number {
    return this._wallHeight;
  }

  public set wallHeight(height: number) {
    this._wallHeight = height;
    this.update({
      parts: true,
    });
  }

  public get landscapeMaterial(): LandscapeMaterial {
    return this._landscapeMaterial;
  }

  public set landscapeMaterial(material: LandscapeMaterial) {
    this._landscapeMaterial = material;
    this.update({
      parts: true,
    });
  }

  public get dragging(): boolean {
    return this._dragging;
  }

  public set dragging(dragging: boolean) {
    this._dragging = dragging;
  }
}
