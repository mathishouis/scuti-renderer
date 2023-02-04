import { Scuti } from "../../Scuti";
import {Container, Texture} from "pixi.js";
import { RoomConfiguration } from "../../interfaces/Room.interface";
import { RoomVisualization } from "./RoomVisualization";
import { RoomTileMap } from "./RoomTileMap";
import { RoomMaterial } from "./RoomMaterial";

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
    private _wallMaterial: RoomMaterial; // TODO: Replace material with an object

    /**
     * The room floor material
     * @private
     */
    private _floorMaterial: RoomMaterial; // TODO: Replace material with an object

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

        this._wallMaterial = configuration.wallMaterial?? new RoomMaterial(0xA5A8B6, Texture.WHITE);
        this._floorMaterial = configuration.floorMaterial ?? new RoomMaterial(0x979764, Texture.WHITE);
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

    public get tileMap(): RoomTileMap {
        return this._tileMap;
    }

    public get wallMaterial(): RoomMaterial {
        return this._wallMaterial;
    }

    public set wallMaterial(material: RoomMaterial) {
        this._wallMaterial = material;
        // TODO: Rerender room visualization
    }

    public get floorMaterial(): RoomMaterial {
        return this._floorMaterial;
    }

    public set floorMaterial(material: RoomMaterial) {
        this._floorMaterial = material;
        // TODO: Rerender room visualization
    }

    public get wallThickness(): number {
        return this._wallThickness;
    }

    public set wallThickness(thickness: number) {
        this._wallThickness = thickness;
        // TODO: Rerender room visualization
    }

    public get floorThickness(): number {
        return this._floorThickness;
    }

    public set floorThickness(thickness: number) {
        this._floorThickness = thickness;
        // TODO: Rerender room visualization
    }

}
