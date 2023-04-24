import {BLEND_MODES, Container, Spritesheet, Texture} from "pixi.js";
import {FloorFurniture} from "./FloorFurniture";
import {WallFurniture} from "./WallFurniture";
import {FurnitureLayer} from "./FurnitureLayer";
import {IFurnitureVisualization} from "../../interfaces/Furniture.interface";
import {FurnitureGuildCustomizedVisualization} from "./visualizations/FurnitureGuildCustomizedVisualization";
import {FurnitureRoomBackgroundVisualization} from "./visualizations/FurnitureRoomBackgroundVisualization";

/**
 * FurniturePart class that represent a furniture layer.
 *
 * @class
 * @memberof Scuti
 */
export class FurniturePart extends Container {

    /**
     * The furniture instance that is the parent of the part.
     *
     * @member {FloorFurniture | WallFurniture}
     * @private
     */
    private _furniture: FloorFurniture | WallFurniture;

    /**
     * The layer id.
     *
     * @member {number}
     * @private
     */
    private _layer: number;

    /**
     * The current frame id.
     *
     * @member {number}
     * @private
     */
    private _frame!: number;

    /**
     * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance.
     * @param {number} [layer] - The layer id.
     */
    constructor(
        furniture: FloorFurniture | WallFurniture,
        layer: number
    ) {
        super();
        /** Store data */
        this._furniture = furniture;
        this._layer = layer;
        /** Draw the part */
        this._draw();
    }

    /**
     * Draw the part.
     *
     * @return {void}
     * @private
     */
    private _draw(): void {
        /** Remove the old layer */
        this.removeChild(this.children[0]);
        /** Needed resources */
        const visualization: IFurnitureVisualization = this._furniture.view.property.visualization;
        const spritesheet: Spritesheet = this._furniture.view.spritesheet;
        /** Layer data */
        let alpha: number = 1;
        let tint: number;
        let z: number = 0;
        let blendMode: BLEND_MODES;
        let flip: boolean = false;
        let frame: number = 0;
        let ignoreMouse: boolean = false;
        let tag: string;
        /** Check if the furniture support the current direction */
        if(visualization.directions.indexOf(this._furniture.direction) === -1) this._furniture.direction = visualization.directions[0];

        if (visualization.animation[this._furniture.state] !== undefined && visualization.animation[this._furniture.state][this._layer] !== undefined && visualization.animation[this._furniture.state][this._layer].frameSequence.length > 1) frame = this._frame;

        if (visualization.animation[this._furniture.state] !== undefined && visualization.animation[this._furniture.state][this._layer] !== undefined) frame = visualization.animation[this._furniture.state][this._layer].frameSequence[frame] ?? 0;
        // @ts-ignore
        if(this._furniture.data.color !== null && visualization.colors[this._furniture.data.color] !== undefined && visualization.colors[this._furniture.data.color][this._layer] !== undefined) tint = Number('0x' + visualization.colors[this._furniture.data.color][this._layer]);
        /** Set the layer data */
        if(visualization.layers[this._layer] !== undefined) {
            if(visualization.layers[this._layer].z !== undefined) z = visualization.layers[this._layer].z;
            if(visualization.layers[this._layer].alpha !== undefined) alpha = visualization.layers[this._layer].alpha / 255;
            // @ts-ignore
            if(visualization.layers[this._layer].ink !== undefined) blendMode = BLEND_MODES[visualization.layers[this._layer].ink];
            if(visualization.layers[this._layer].ignoreMouse !== undefined) ignoreMouse = visualization.layers[this._layer].ignoreMouse;
            if(visualization.layers[this._layer].tag !== undefined) tag = visualization.layers[this._layer].tag;
        }

        if(this._furniture.view.visualization !== undefined) {
            if(this._furniture.view.visualization instanceof FurnitureGuildCustomizedVisualization) {
                // @ts-ignore
                if(tag === "COLOR1") tint = this._furniture.view.visualization.primaryColor;
                // @ts-ignore
                if(tag === "COLOR2") tint = this._furniture.view.visualization.secondaryColor;
            }
        }

        const name: string = [this._furniture.data.baseName, this._furniture.data.baseName, 64, String.fromCharCode(97 + Number(this._layer)), this._furniture.direction, frame].join("_");
        /** Calculate zOrder */
        // @ts-ignore
        z = (((this._furniture.roomPosition.x + this._furniture.roomPosition.y + (Math.trunc(z / 100)) / 10) * 1000000 + (this._furniture.roomPosition.z * 10000)) + 10000000 * 11);
        // @ts-ignore
        if(spritesheet.data.frames[name] !== undefined) flip = spritesheet.data.frames[name]['flipH'];
        /** Create the layer */
        // @ts-ignore
        const layer = this.addChild(new FurnitureLayer(this._furniture, {
            layer: String.fromCharCode(97 + Number(this._layer)),
            alpha: alpha,
            // @ts-ignore
            tint: tint,
            z: z,
            // @ts-ignore
            blendMode: blendMode,
            flip: flip,
            frame: frame,
            ignoreMouse: ignoreMouse,
            direction: this._furniture.direction,
            // @ts-ignore
            tag: tag
        }));
        if(this._furniture.view.visualization !== undefined) {
            if (this._furniture.view.visualization instanceof FurnitureRoomBackgroundVisualization) {
                if(this._furniture.view.visualization.imageUrl.length > 0) layer.texture = Texture.from(this._furniture.view.visualization.imageUrl);
                layer.x += this._furniture.view.visualization.offsetX;
                layer.y += this._furniture.view.visualization.offsetY;
                layer.zIndex += this._furniture.view.visualization.offsetZ;
            }
        }
    }

    /**
     * Switch the part to the next frame and rerender it.
     *
     * @return {void}
     * @private
     */
    public nextFrame(): void {
        const visualization: IFurnitureVisualization = this._furniture.view.property.visualization;
        // @ts-ignore
        if(visualization.animation[String(this._furniture.state)] !== undefined && visualization.animation[String(this._furniture.state)][this._layer] !== undefined) {
            // @ts-ignore
            const frameSequence: number[] = visualization.animation[String(this._furniture.state)][this._layer].frameSequence;
            const currentFrame: number = this._frame;
            if(frameSequence.length > 1)  {
                if ((frameSequence.length - 1) > currentFrame) {
                    this._frame = currentFrame + 1;
                } else {
                    this._frame = 0;
                }
                this._draw();
            } else {
                this._draw();
            }
        }
    }

}
