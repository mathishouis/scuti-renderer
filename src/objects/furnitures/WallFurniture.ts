import { Assets, BLEND_MODES, Sprite, Spritesheet } from "pixi.js";
import {
    FurnitureFrameId,
    FurnitureLayerId,
    IFurnitureVisualization,
    IWallFurnitureConfiguration,
    WallPosition
} from "../../interfaces/Furniture.interface";
import { Direction } from "../../types/Direction";
import { FurnitureData } from "./FurnitureData";
import { FurnitureLayer } from "./FurnitureLayer";
import { RoomObject } from "../rooms/RoomObject";
import { gsap } from "gsap";

export class WallFurniture extends RoomObject {

    /**
     * The furniture id
     * @private
     */
    private readonly _id: number;

    /**
     * The furniture position
     * @private
     */
    private _position: WallPosition;

    /**
     * The furniture direction
     * @private
     */
    private _direction: Direction;

    /**
     * The furniture state
     * @private
     */
    private _state: number;

    /**
     * The furniture data
     * @private
     */
    private _data: FurnitureData;

    /**
     * The current frame for each layers
     * @private
     */
    private _frames: Map<FurnitureFrameId, FurnitureLayerId> = new Map();

    /**
     * FloorFurniture class
     * @param configuration = The furniture configuration
     */
    constructor(
        configuration: IWallFurnitureConfiguration
    ) {
        super();

        this._id = configuration.id;
        this._position = configuration.position;
        this._direction = configuration.direction;
        this._state = configuration.state ?? 0;
        this._data = new FurnitureData(this);

        this._createPlaceholder();
        Assets.add("furnitures/" + this._data.baseName, "http://localhost:8081/furniture/" + this._data.baseName + "/" + this._data.baseName + ".json");
        Assets.load("furnitures/" + this._data.baseName).then(() => this._draw());
    }

    /**
     * Draw the furniture
     * @private
     */
    private _draw(): void {
        this._destroyParts();
        const spritesheet: Spritesheet = Assets.get("furnitures/" + this._data.baseName);
        const visualization: IFurnitureVisualization = spritesheet.data["furniProperty"].visualization;

        for (let i: number = 0; i < visualization.layerCount; i++) {
            this._createLayer(i);
        }

        this.x = 32 + 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32;
        if(this._direction === 2) {
            this.x = this.x + this._position.offsetX * 2;
            this.y = this.y + this._position.offsetY * 2 - 84;
        } else {
            this.x = this.x + this._position.offsetX * 2 - 32;
            this.y = this.y + this._position.offsetY * 2 - 84;
        }
    }

    /**
     * Draw the layer
     * @param layer
     * @private
     */
    private _createLayer(
        layer: FurnitureLayerId
    ): void {
        const spritesheet: Spritesheet = Assets.get("furnitures/" + this._data.baseName);
        const visualization: IFurnitureVisualization = spritesheet.data["furniProperty"].visualization;

        let alpha: number = 1;
        let tint: number;
        let z: number;
        let blendMode: BLEND_MODES;
        let flip: boolean = false;
        let frame: number = 0;
        let ignoreMouse: boolean = false;

        if(visualization.directions.indexOf(this._direction) === -1) {
            this._direction = visualization.directions[0];
        }

        if (visualization.animation[this._state] !== undefined && visualization.animation[this._state][layer] !== undefined && visualization.animation[this._state][layer].frameSequence.length > 1) {
            if (this._frames.has(layer)) {
                frame = this._frames.get(layer);
            } else {
                this._frames.set(layer, 0);
            }
        }

        if (visualization.animation[this._state] !== undefined && visualization.animation[this._state][layer] !== undefined) {
            frame = visualization.animation[this._state][layer].frameSequence[frame] ?? 0;
        }

        if(this._data.color !== null && visualization.colors[this._data.color] !== undefined && visualization.colors[this._data.color][layer] !== undefined) {
            tint = Number('0x' + visualization.colors[this._data.color][layer]);
        }

        if(visualization.layers[layer] !== undefined) {
            if(visualization.layers[layer].z !== undefined) z = visualization.layers[layer].z;
            if(visualization.layers[layer].alpha !== undefined) alpha = visualization.layers[layer].alpha / 255;
            if(visualization.layers[layer].ink !== undefined) blendMode = BLEND_MODES.ADD;
            if(visualization.layers[layer].ignoreMouse !== undefined) ignoreMouse = visualization.layers[layer].ignoreMouse;
        }

        if(spritesheet.data.frames[this._data.baseName + '_' + this._data.baseName + '_64_' + String.fromCharCode(97 + Number(layer)) + '_' + this._direction + '_' + frame] !== undefined) {
            flip = spritesheet.data.frames[this._data.baseName + '_' + this._data.baseName + '_64_' + String.fromCharCode(97 + Number(layer)) + '_' + this._direction + '_' + frame]['flipH'];
        }

        this.addChild(new FurnitureLayer(this, {
            layer: layer,
            alpha: alpha,
            tint: tint,
            z: z,
            blendMode: blendMode,
            flip: flip,
            frame: frame,
            ignoreMouse: ignoreMouse
        }));
    }

    /**
     * Draw the next frame
     * @private
     */
    private _updateFrame(): void {
        this._frames.forEach((frame: FurnitureFrameId, layer: FurnitureLayerId) => {
            const spritesheet: Spritesheet = Assets.get("furnitures/" + this._data.baseName);
            const visualization: IFurnitureVisualization = spritesheet.data["furniProperty"].visualization;

            if(visualization.animation[String(this._state)] !== undefined && visualization.animation[String(this._state)][layer] !== undefined) {
                const frameSequence: number[] = visualization.animation[String(this._state)][layer].frameSequence;
                const currentFrame: number = frame;
                if(frameSequence.length > 1)  {
                    if ((frameSequence.length - 1) > currentFrame) {
                        this._frames.set(layer, currentFrame + 1);
                    } else {
                        this._frames.set(layer, 0);
                    }
                    this._draw();
                }

            }

        });
    }

    /**
     * Draw the furniture placeholder
     * @private
     */
    private _createPlaceholder(): void {
        const placeholder: Sprite = new Sprite(Assets.get("furnitures/floor/placeholder").textures["place_holder_furniture_64.png"]);
        this.addChild(placeholder);

        placeholder.x = -32;
        placeholder.y = -50;
    }

    /**
     * Destroy all sprites
     * @private
     */
    private _destroyParts(): void {
        while(this.children[0]) {
            this.removeChild(this.children[0]);
        }
    }

    /**
     * On each animation tick
     * @private
     */
    private _onTicker(): void {
        this._updateFrame();
    }

    /**
     * Start the furniture animation
     */
    public startAnimation(): void {
        this.animationTicker.add(() => this._onTicker());
    }

    /**
     * Stop the furniture animation
     */
    public stopAnimation(): void {
        this.animationTicker.remove(() => this._onTicker());
    }

    public get id(): number {
        return this._id;
    }

    /**
     * Get the furniture data
     */
    public get data(): FurnitureData {
        return this._data;
    }

    /**
     * Get the furniture position
     */
    public get pos(): WallPosition {
        return this._position;
    }

    /**
     * Update the furniture position
     * @param position
     */
    public set pos(position: WallPosition) {
        if(this._direction === 2) {
            gsap.to(this, {
                x: 32 + 32 * this._position.x - 32 * this._position.y + this._position.offsetX * 2,
                y: 16 * this._position.x + 16 * this._position.y - 32 + this._position.offsetY * 2 - 84,
                duration: 0.5,
                ease: "linear",
                onComplete: () => {
                    this._position = position;
                }
            });
        } else {
            gsap.to(this, {
                x: 32 + 32 * this._position.x - 32 * this._position.y + this._position.offsetX * 2 - 32,
                y: 16 * this._position.x + 16 * this._position.y - 32 + this._position.offsetY * 2 - 84,
                duration: 0.5,
                ease: "linear",
                onComplete: () => {
                    this._position = position;
                }
            });
        }
    }

    /**
     * Get the furniture direction
     */
    public get direction(): Direction {
        return this._direction;
    }

    /**
     * Update the furniture direction
     * @param direction
     */
    public set direction(direction: Direction) {
        this._direction = direction;
        this._draw();
    }

    /**
     * Return the furniture state
     */
    public get state(): number {
        return this._state;
    }

    /**
     * Update the furniture state
     * @param state
     */
    public set state(state: number) {
        this._state = state;
        this._draw();
    }

}
