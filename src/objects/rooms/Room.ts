import { Scuti } from '../../Scuti';
import { RoomVisualization } from './RoomVisualization';
import { RoomCamera } from './RoomCamera';
import { GameObject } from '../GameObject';
import { RoomHeightmap } from './RoomHeightmap';
import { RoomEvents } from './RoomEvents';
import { FloorMaterial } from './materials/FloorMaterial';
import { WallMaterial } from './materials/WallMaterial';
import { LandscapeMaterial } from './materials/LandscapeMaterial';
import { RoomObject } from './objects/RoomObject';

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
  centerCamera?: boolean;
  zoom?: number;
}

export class Room extends GameObject {
  public renderer!: Scuti;
  public parsedHeightMap!: RoomHeightmap;
  public visualization!: RoomVisualization;
  public camera!: RoomCamera;
  public events!: RoomEvents;

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
  private _centerCamera: boolean;
  private _zoom: number;

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
    centerCamera,
    zoom,
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
    this._centerCamera = centerCamera ?? true;
    this._zoom = zoom ?? 1;

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
    this.renderer.application.stage.addChild(this.camera);
  }

  public update(parts = true, objects = true, cursor = true): void {
    if (parts) this.parsedHeightMap = new RoomHeightmap(this.heightMap);
    this.visualization.update(parts, objects, cursor);
  }

  public destroy(): void {
    if (this.visualization !== undefined) {
      this.visualization.destroy();
      this.visualization = undefined as any;
    }
  }

  public add(object: RoomObject): void {
    this.visualization.add(object);
  }

  public get heightMap(): string {
    return this._heightMap;
  }

  public set heightMap(heightMap: string) {
    this._heightMap = heightMap;
    this.update(true, false, false);
  }

  public get floorMaterial(): FloorMaterial {
    return this._floorMaterial;
  }

  public set floorMaterial(material: FloorMaterial) {
    this._floorMaterial.destroy();
    material.room = this;
    material.render();
    this._floorMaterial = material;
    this.update(true, false, false);
  }

  public get floorThickness(): number {
    return this._floorThickness;
  }

  public set floorThickness(thickness: number) {
    this._floorThickness = thickness;
    this.update(true, false, false);
  }

  public get floorHidden(): boolean {
    return this._floorHidden;
  }

  public set floorHidden(hidden: boolean) {
    this._floorHidden = hidden;
    this.update(true, false, false);
  }

  public get wallMaterial(): WallMaterial {
    return this._wallMaterial;
  }

  public set wallMaterial(material: WallMaterial) {
    this._wallMaterial.destroy();
    material.room = this;
    material.render();
    this._wallMaterial = material;
    this.update(true, false, false);
  }

  public get wallThickness(): number {
    return this._wallThickness;
  }

  public set wallThickness(thickness: number) {
    this._wallThickness = thickness;
    this.update(true, false, false);
  }

  public get wallHidden(): boolean {
    return this._wallHidden;
  }

  public set wallHidden(hidden: boolean) {
    this._wallHidden = hidden;
    this.update(true, false, false);
  }

  public get wallHeight(): number {
    return this._wallHeight;
  }

  public set wallHeight(height: number) {
    this._wallHeight = height;
    this.update(true, false, false);
  }

  public get landscapeMaterial(): LandscapeMaterial {
    return this._landscapeMaterial;
  }

  public set landscapeMaterial(material: LandscapeMaterial) {
    this._landscapeMaterial = material;
    this.update(true, false, false);
  }

  public get dragging(): boolean {
    return this._dragging;
  }

  public set dragging(dragging: boolean) {
    this._dragging = dragging;
  }

  public get centerCamera(): boolean {
    return this._centerCamera;
  }

  public set centerCamera(centerCamera: boolean) {
    this._centerCamera = centerCamera;
  }

  public get zoom(): number {
    return this._zoom;
  }

  public set zoom(zoom: number) {
    this._zoom = zoom;
  }
}
