import { FloorFurniture } from "../FloorFurniture";
import { WallFurniture } from "../WallFurniture";
import { FurnitureVisualization } from "./FurnitureVisualization";

/**
 * FurnitureGuildCustomizedVisualization class for the guild furnitures.
 *
 * @class
 * @memberof Scuti
 */
export class FurnitureGuildCustomizedVisualization extends FurnitureVisualization {

    /**
     * The primary color.
     *
     * @member {number}
     * @private
     */
    private _primaryColor: number = 0xFFFFFF;

    /**
     * The secondary color.
     *
     * @member {number}
     * @private
     */
    private _secondaryColor: number = 0xFFFFFF;

    /**
     * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance.
     */
    constructor(
        furniture: FloorFurniture | WallFurniture
    ) {
        super(furniture);
    }

    /**
     * Reference to the primary color.
     *
     * @member {number}
     * @readonly
     * @public
     */
    public get primaryColor(): number {
        return this._primaryColor;
    }

    /**
     * Update the primary color.
     *
     * @param {number} [color] - The new primary color.
     * @public
     */
    public set primaryColor(
        color: number
    ) {
        this._primaryColor = color;
        this.furniture.view.update();
    }

    /**
     * Reference to the secondary color.
     *
     * @member {number}
     * @readonly
     * @public
     */
    public get secondaryColor(): number {
        return this._secondaryColor;
    }

    /**
     * Update the secondary color.
     *
     * @param {number} [color] - The new secondary color.
     * @public
     */
    public set secondaryColor(
        color: number
    ) {
        this._secondaryColor = color;
        this.furniture.view.update();
    }

}
