import { Scuti } from "../../Scuti";
import { Container } from "pixi.js";
import { IRoomConfiguration } from "../../interfaces/Room.interface";
import { RoomVisualization } from "./RoomVisualization";
import { RoomTileMap } from "./RoomTileMap";
import { Material } from "./materials/Material";
import { WallMaterial } from "./materials/WallMaterial";
import { FloorMaterial } from "./materials/FloorMaterial";
import { RoomCamera } from "./RoomCamera";
import { RoomObject } from "./RoomObject";
import {RoomObjectContainer} from "./RoomObjectContainer";

/**
 * Room class for rendering rooms like the ones on Habbo Hotel.
 *
 * @class
 * @memberof Scuti
 */
export class Room extends Container {

    /**
     * The game engine instance that the room will be using to render objects.
     *
     * @member {Scuti}
     * @private
     */
    private _engine: Scuti;

    /**
     * The room tile map where every informations about the room model is stored.
     *
     * @member {RoomTileMap}
     * @private
     */
    private _tileMap: RoomTileMap;

    /**
     * The wall material that will be applied in the room, it contains the color and the texture of the wall.
     *
     * @member {Material}
     * @private
     */
    private _wallMaterial: Material;

    /**
     * The floor material that will be applied in the room, it contains the color and the texture of the wall.
     *
     * @member {Material}
     * @private
     */
    private _floorMaterial: Material;

    /**
     * The wall thickness of the room.
     *
     * @member {number}
     * @private
     */
    private _wallThickness: number;

    /**
     * The floor thickness of the room.
     *
     * @member {number}
     * @private
     */
    private _floorThickness: number;

    /**
     * The wall height of the room, the height is added to the base height of the room.
     *
     * @member {number}
     * @private
     */
    private _wallHeight: number;

    /**
     * The room visualization instance, where all the objects like furnitures, avatars or the tiles, walls and stairs are stored.
     *
     * @member {RoomVisualization}
     * @private
     */
    private _visualization: RoomVisualization;

    /**
     * The room camera, it manage the room dragging and centering the room when it's out of bounds.
     *
     * @member {RoomCamera}
     * @private
     */
    private _camera: RoomCamera;

    /**
     * @param {Scuti} [engine] - The Scuti instance that will be used to render the room.
     * @param {IRoomConfiguration} [configuration] - The room configuration.
     * @param {string} [configuration.tilemap] - The room tile map that will be parsed.
     * @param {Material} [configuration.floorMaterial] - The room floor material that will be applied.
     * @param {number} [configuration.floorThickness] - The room floor thickness.
     * @param {Material} [configuration.wallMaterial] - The room wall material that will be applied.
     * @param {number} [configuration.wallHeight] - The room wall height.
     * @param {number} [configuration.wallThickness] - The room wall thickness.
     **/
    constructor(
        engine: Scuti,
        configuration: IRoomConfiguration
    ) {
        super();

        /** Store variables */
        this._engine = engine;
        this._wallMaterial = configuration.wallMaterial ?? new WallMaterial(this._engine, 112);
        this._floorMaterial = configuration.floorMaterial ?? new FloorMaterial(this._engine, 111);
        this._wallThickness = configuration.wallThickness ?? 8;
        this._floorThickness = configuration.floorThickness ?? 8;
        this._wallHeight = configuration.wallHeight ?? 0;

        /** Initialise everything */
        this._tileMap = new RoomTileMap(configuration.tileMap);
        this._visualization = new RoomVisualization(this);
        this._camera = new RoomCamera(this);

        /** Add the room visualization and then the room camera to the PixiJS application */
        this.addChild(this._visualization);
        this._engine.application.stage.addChild(this._camera);
    }

    /**
     * Reference to the game engine instance.
     *
     * @member {Scuti}
     * @readonly
     * @public
     */
    public get engine(): Scuti {
        return this._engine;
    }

    /**
     * Reference to the room visualization instance.
     *
     * @member {RoomVisualization}
     * @readonly
     * @public
     */
    public get visualization(): RoomVisualization {
        return this._visualization;
    }

    /**
     * Reference to the room tile map instance.
     *
     * @member {RoomTileMap}
     * @readonly
     * @public
     */
    public get tileMap(): RoomTileMap {
        return this._tileMap;
    }

    /**
     * Reference to the wall material instance.
     *
     * @member {Material}
     * @readonly
     * @public
     */
    public get wallMaterial(): Material {
        return this._wallMaterial;
    }

    /**
     * Update the wall material and rerender the room.
     *
     * @param {Material} [material] - The room wall material that will be applied.
     * @public
     */
    public set wallMaterial(
        material: Material
    ) {
        this._wallMaterial = material;
        // TODO: Rerender room visualization
    }

    /**
     * Reference to the floor material instance.
     *
     * @member {Material}
     * @readonly
     * @public
     */
    public get floorMaterial(): Material {
        return this._floorMaterial;
    }

    /**
     * Update the floor material and rerender the room.
     *
     * @param {Material} [material] - The room floor material that will be applied.
     * @public
     */
    public set floorMaterial(
        material: Material
    ) {
        this._floorMaterial = material;
        // TODO: Rerender room visualization
    }

    /**
     * Reference to the wall thickness.
     *
     * @member {number}
     * @readonly
     * @public
     */
    public get wallThickness(): number {
        return this._wallThickness;
    }

    /**
     * Update the wall thickness and rerender the room.
     *
     * @param {number} [thickness] - The room wall thickness that will be applied.
     * @public
     */
    public set wallThickness(
        thickness: number
    ) {
        this._wallThickness = thickness;
        // TODO: Rerender room visualization
    }

    /**
     * Reference to the floor thickness.
     *
     * @member {number}
     * @readonly
     * @public
     */
    public get floorThickness(): number {
        return this._floorThickness;
    }

    /**
     * Update the floor thickness and rerender the room.
     *
     * @param {number} [thickness] - The room floor thickness that will be applied.
     * @public
     */
    public set floorThickness(
        thickness: number
    ) {
        this._floorThickness = thickness;
        // TODO: Rerender room visualization
    }

    /**
     * Reference to the wall height.
     *
     * @member {number}
     * @readonly
     * @public
     */
    public get wallHeight(): number {
        return this._wallHeight;
    }

    /**
     * Update the wall height and rerender the room.
     *
     * @param {number} [height] - The room wall height that will be applied.
     * @public
     */
    public set wallHeight(
        height: number
    ) {
        this._wallHeight = height;
    }

    /**
     * Reference to the object layer container.
     *
     * @member {RoomObjectContainer}
     * @readonly
     * @public
     */
    public get objects(): RoomObjectContainer {
        return this._visualization.objectLayer;
    }

}
