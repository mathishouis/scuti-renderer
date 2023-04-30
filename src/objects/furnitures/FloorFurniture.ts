import type {IFloorFurnitureConfiguration, IFloorPosition} from '../../interfaces/Furniture';
import type { Direction } from '../../enums/Direction';
import { FurnitureData } from './FurnitureData';
import {FurnitureAnimatedVisualization} from "./visualizations/FurnitureAnimatedVisualization";
import {RoomObject} from "../rooms/objects/RoomObject";

/**
 * FloorFurniture class that aim to reproduce the floor furnitures on Habbo.
 *
 * @class
 * @memberof Scuti
 */
export class FloorFurniture extends RoomObject {
  /**
   * The furniture id that represent the one in furnidata.
   *
   * @member {number}
   * @private
   */
  private readonly _id: number;

  /**
   * A boolean indicating if we have to apply the wired selection filter to the furniture.
   *
   * @member {boolean}
   * @private
   */
  private _selected: boolean = false;

  /**
   * The furniture data.
   *
   * @member {FurnitureData}
   * @private
   */
  private readonly _data: FurnitureData;

  //private _visualization!: FurnitureVisualization;

  /**
   * @param {IFloorFurnitureConfiguration} [configuration] - The furniture configuration.
   */
  constructor(configuration: IFloorFurnitureConfiguration) {
    super();
    /** Store the data */
    this._id = configuration.id;
    this._position = configuration.position;
    this._direction = configuration.direction;
    this._state = configuration.state ?? 0;
    this._data = new FurnitureData(this);
    this._visualization = new FurnitureAnimatedVisualization(this);
    /** Initialise view */
    //this._view = new FurnitureView(this);
    //this.addChild(this._view);
    /** Set the furniture position in the canvas */
    //this._updatePosition();
  }




  /**
   * Reference to the furniture id from the furni data.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Reference to the furniture selection state.
   *
   * @member {boolean}
   * @readonly
   * @public
   */
  public get selected(): boolean {
    return this._selected;
  }

  /**
   * Update the furniture selection state (add the wired selection filter to the furniture).
   *
   * @param {boolean} [selected] - The new furniture selection state.
   * @public
   */
  public set selected(selected: boolean) {
    this._selected = selected;
    this._visualization.render();
  }

  /**
   * Reference to the furniture data.
   *
   * @member {FurnitureData}
   * @readonly
   * @public
   */
  public get data(): FurnitureData {
    return this._data;
  }
}
