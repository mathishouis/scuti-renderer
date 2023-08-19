import { FloorMaterial } from "./materials/FloorMaterial.ts";
import { IRoomConfiguration } from "../../interfaces/IRoomConfiguration.ts";
import { Room } from "./Room.ts";

export class RoomConfiguration {
    private _heightMap!: string;

    private _floorMaterial!: FloorMaterial;
    private _floorThickness!: number;
    private _floorHidden!: boolean;

    private _wallMaterial!: number;
    private _wallThickness!: number;
    private _wallHidden!: boolean;
    private _wallHeight!: number;

    private _dragging!: boolean;
    private _centerCamera!: boolean;
    private _zoom!: number;

    constructor(
        public room: Room,
        configuration: IRoomConfiguration
    ) {
        this._heightMap = configuration.heightMap;

        this._floorMaterial = configuration.floorMaterial ?? new FloorMaterial(111);
        this._floorThickness = configuration.floorThickness ?? 8;
        this._floorHidden = configuration.floorHidden ?? false;

        this._wallMaterial = configuration.wallMaterial ?? 111;
        this._wallThickness = configuration.wallThickness ?? 8;
        this._wallHidden = configuration.wallHidden ?? false;
        this._wallHeight = configuration.wallHeight ?? 0;

        this._dragging = configuration.dragging ?? true;
        this._centerCamera = configuration.centerCamera ?? true;
        this._zoom = configuration.zoom ?? 1;
    }

    public get heightMap(): string {
        return this._heightMap;
    }

    public set heightMap(heightMap: string) {
        this._heightMap = heightMap;
        this.room.render();
    }

    public get floorMaterial(): FloorMaterial {
        return this._floorMaterial;
    }

    public set floorMaterial(material: FloorMaterial) {
        this._floorMaterial = material;
        this.room.render();
    }

    public get floorThickness(): number {
        return this._floorThickness;
    }

    public set floorThickness(thickness: number) {
        this._floorThickness = thickness;
        this.room.render();
    }

    public get floorHidden(): boolean {
        return this._floorHidden;
    }

    public set floorHidden(hidden: boolean) {
        this._floorHidden = hidden;
        this.room.render();
    }

    public get wallMaterial(): number {
        return this._wallMaterial;
    }

    public set wallMaterial(material: number) {
        this._wallMaterial = material;
        this.room.render();
    }

    public get wallThickness(): number {
        return this._wallThickness;
    }

    public set wallThickness(thickness: number) {
        this._wallThickness = thickness;
        this.room.render();
    }

    public get wallHidden(): boolean {
        return this._wallHidden;
    }

    public set wallHidden(hidden: boolean) {
        this._wallHidden = hidden;
        this.room.render();
    }

    public get wallHeight(): number {
        return this._wallHeight;
    }

    public set wallHeight(height: number) {
        this._wallHeight = height;
        this.room.render();
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
