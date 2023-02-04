import { Scuti } from "../../Scuti";
import { Container } from "pixi.js";
import { RoomConfiguration } from "../../interfaces/Room.interface";
import { RoomVisualization } from "./RoomVisualization";
import { RoomTileMap } from "./RoomTileMap";
import { Material } from "./materials/Material";
import { WallMaterial } from "./materials/WallMaterial";
import { FloorMaterial } from "./materials/FloorMaterial";

export class Room extends Container {

    /**
     * Game engine.
     * @private
     */
    private _engine: Scuti;

    /**
     * The room tilemap
     * @private
     */
    private _tileMap: RoomTileMap;

    /**
     * The room wall material
     * @private
     */
    private _wallMaterial: Material; // TODO: Replace material with an object

    /**
     * The room floor material
     * @private
     */
    private _floorMaterial: Material; // TODO: Replace material with an object

    /**
     * The room wall thickness
     * @private
     */
    private _wallThickness: number;

    /**
     * The room floor thickness
     * @private
     */
    private _floorThickness: number;

    /**
     * The room wall height
     * @private
     */
    private _wallHeight: number;

    /**
     * The room visualization
     * @private
     */
    private _visualization: RoomVisualization;

    /**
     * Room class.
     * @param engine - The game engine instance.
     * @param configuration - The room configuration
     */
    constructor(
        engine: Scuti,
        configuration: RoomConfiguration
    ) {
        super();

        this._engine = engine;
        this._wallMaterial = configuration.wallMaterial ?? new WallMaterial(this._engine, 112);
        this._floorMaterial = configuration.floorMaterial ?? new FloorMaterial(this._engine, 111);
        this._wallThickness = configuration.wallThickness ?? 8;
        this._floorThickness = configuration.floorThickness ?? 8;
        this._wallHeight = configuration.wallHeight;

        this._tileMap = new RoomTileMap(configuration.tileMap);
        this._visualization = new RoomVisualization(this);

        // TODO: Remove this shit
        this._visualization.x = window.innerWidth / 1.7;
        this._visualization.y = window.innerHeight / 3;

        engine.application.stage.addChild(this._visualization);
    }

    /**
     * Return the engine instance
     */
    public get engine(): Scuti {
        return this._engine;
    }

    /**
     * Return the room visualization
     */
    public get visualization(): RoomVisualization {
        return this._visualization;
    }

    /**
     * Change the room visualization
     * @param visualization
     */
    public set visualization(visualization: RoomVisualization) {
        this._visualization = visualization;
    }

    /**
     * Return the room tilemap
     */
    public get tileMap(): RoomTileMap {
        return this._tileMap;
    }

    /**
     * Return the wall material
     */
    public get wallMaterial(): Material {
        return this._wallMaterial;
    }

    /**
     * Update the wall material
     * @param material
     */
    public set wallMaterial(material: Material) {
        this._wallMaterial = material;
        // TODO: Rerender room visualization
    }

    /**
     * Return the floor material
     */
    public get floorMaterial(): Material {
        return this._floorMaterial;
    }

    /**
     * Update the floor material
     * @param material
     */
    public set floorMaterial(material: Material) {
        this._floorMaterial = material;
        // TODO: Rerender room visualization
    }

    /**
     * Return the wall thickness
     */
    public get wallThickness(): number {
        return this._wallThickness;
    }

    /**
     * Update the wall thickness
     * @param thickness
     */
    public set wallThickness(thickness: number) {
        this._wallThickness = thickness;
        // TODO: Rerender room visualization
    }

    /**
     * Return the floor thickness
     */
    public get floorThickness(): number {
        return this._floorThickness;
    }

    /**
     * Update the floor thickness
     * @param thickness
     */
    public set floorThickness(thickness: number) {
        this._floorThickness = thickness;
        // TODO: Rerender room visualization
    }

}
