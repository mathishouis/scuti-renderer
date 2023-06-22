import type { Sprite } from 'pixi.js';

import type { Direction } from '../../../enums/Direction';
import { Logger } from '../../../utilities/Logger';

export abstract class RoomObjectVisualization {
  /**
   * The room object visualization's logger instance.
   *
   * @member {Logger}
   * @private
   */
  private readonly _logger = new Logger('RoomObjectVisualization');

  private _placeholder!: Sprite;

  private _directions!: Direction[];

  private _loaded = false;

  /**
   * Renders the visual layers of the room object.
   *
   * @public
   */
  public abstract render(): void;

  /**
   * Renders the placeholder right before the layers of the room object when loading.
   *
   * @public
   */
  public abstract renderPlaceholder(): void;

  /**
   * Updates the position of each visual layer of the room object.
   *
   * @public
   */
  public abstract updatePosition(): void;

  /**
   * Removes all visual layers of the room object.
   *
   * @public
   */
  public abstract destroy(): void;

  get loaded(): boolean {
    return this._loaded;
  }

  set loaded(load: boolean) {
    this._loaded = load;
  }

  set placeholder(placeholder: Sprite) {
    this._placeholder = placeholder;
  }

  get placeholder(): Sprite {
    return this._placeholder;
  }

  set directions(directions: Direction[]) {
    this._directions = directions;
  }

  get directions(): Direction[] {
    return this._directions;
  }

  get logger(): Logger {
    return this._logger;
  }
}
