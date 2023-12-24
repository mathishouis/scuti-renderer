import { FloorMaterial } from './materials/FloorMaterial';
import { Room } from './Room';
import { WallMaterial } from './materials/WallMaterial';
import { LandscapeMaterial } from './materials/LandscapeMaterial';

interface Configuration {
  room: Room;
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
  zoomLevel?: number;
  scrollZoom?: boolean;
  zoomDuration?: number;
  minZoom?: number;
  maxZoom?: number;
}

export class RoomConfiguration {
  public room: Room;

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
  private _zoomLevel: number;
  private _scrollZoom: boolean;
  private _zoomDuration: number;
  private _minZoom: number;
  private _maxZoom: number;

  constructor({
    room,
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
    zoomLevel,
    scrollZoom,
    zoomDuration,
    minZoom,
    maxZoom,
  }: Configuration) {
    this.room = room;
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
    this._zoomLevel = zoomLevel ?? 1;
    this._scrollZoom = scrollZoom ?? false;
    this._zoomDuration = zoomDuration ?? 0.5;
    this._minZoom = minZoom ?? 0.5;
    this._maxZoom = maxZoom ?? 3;
  }

  public get heightMap(): string {
    return this._heightMap;
  }

  public set heightMap(heightMap: string) {
    this._heightMap = heightMap;
    this.room.update();
  }

  public get floorMaterial(): FloorMaterial {
    return this._floorMaterial;
  }

  public set floorMaterial(material: FloorMaterial) {
    this._floorMaterial = material;
    this.room.update();
  }

  public get floorThickness(): number {
    return this._floorThickness;
  }

  public set floorThickness(thickness: number) {
    this._floorThickness = thickness;
    this.room.update();
  }

  public get floorHidden(): boolean {
    return this._floorHidden;
  }

  public set floorHidden(hidden: boolean) {
    this._floorHidden = hidden;
    this.room.update();
  }

  public get wallMaterial(): WallMaterial {
    return this._wallMaterial;
  }

  public set wallMaterial(material: WallMaterial) {
    this._wallMaterial = material;
    this.room.update();
  }

  public get wallThickness(): number {
    return this._wallThickness;
  }

  public set wallThickness(thickness: number) {
    this._wallThickness = thickness;
    this.room.update();
  }

  public get wallHidden(): boolean {
    return this._wallHidden;
  }

  public set wallHidden(hidden: boolean) {
    this._wallHidden = hidden;
    this.room.update();
  }

  public get wallHeight(): number {
    return this._wallHeight;
  }

  public set wallHeight(height: number) {
    this._wallHeight = height;
    this.room.update();
  }

  public get landscapeMaterial(): LandscapeMaterial {
    return this._landscapeMaterial;
  }

  public set landscapeMaterial(material: LandscapeMaterial) {
    this._landscapeMaterial = material;
    this.room.update();
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

  public get zoomLevel(): number {
    return this._zoomLevel;
  }

  public set zoomLevel(value: number) {
    this._zoomLevel = value;
    this.room.camera.zoom(value, this._zoomDuration);
  }

  public get scrollZoom(): boolean {
    return this._scrollZoom;
  }

  public set scrollZoom(scrollZoom: boolean) {
    this._scrollZoom = scrollZoom;
  }

  public get zoomDuration(): number {
    return this._zoomDuration;
  }

  public set zoomDuration(value: number) {
    this._zoomDuration = value;
  }

  public get minZoom(): number {
    return this._minZoom;
  }

  public set minZoom(value: number) {
    this._minZoom = value;
  }

  public get maxZoom(): number {
    return this._maxZoom;
  }

  public set maxZoom(value: number) {
    this._maxZoom = value;
  }
}
