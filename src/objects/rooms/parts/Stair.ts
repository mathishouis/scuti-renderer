import { Container, Graphics, Matrix, Point, Polygon } from 'pixi.js';
import { Color } from '@pixi/color';

import type { Room } from '../Room';
import type { IPosition3D, IPosition2D, IStairConfiguration } from '../../../types/Room';
import type { Material } from '../materials/Material';
import { StairType } from '../../../enums/StairType';
import { Direction } from '../../../enums/Direction';
import { FloorMaterial } from '../materials/FloorMaterial';
import { ZOrder } from '../../../utilities/ZOrder';
import { RoomPart } from './RoomPart';

/**
 * Stair class that show up when two tiles side by side have a height difference of one.
 *
 * @class
 * @memberof Scuti
 */
export class Stair extends RoomPart {
  /**
   * The thickness of the stair part.
   *
   * @member {number}
   * @private
   */
  private readonly _thickness: number;

  /**
   * The stair material that will be applied to this part, it contains the color and the texture of the stair.
   *
   * @member {Material}
   * @private
   */
  private readonly _material: Material;

  /**
   * The stair position.
   *
   * @member {IPosition3D}
   * @private
   */
  readonly _position: IPosition3D;

  /**
   * The stair type.
   *
   * @member {StairType}
   * @private
   */
  private readonly _type: StairType;

  /**
   * @param {Room} [room] - The room instance where the stair will be drawn.
   * @param {IStairConfiguration} [configuration] - The stair configuration.
   * @param {Material} [configuration.material] - The stair material that will be applied.
   * @param {number} [configuration.thickness] - The stair thickness.
   * @param {IPosition3D} [configuration.position] - The stair position.
   * @param {StairType} [configuration.type] - The stair type.
   **/
  constructor(room: Room, configuration: IStairConfiguration) {
    super(room);

    /** Store the configuration */
    this.room = room;
    this._position = configuration.position;
    this._thickness = configuration.thickness ?? 8;
    this._material = configuration.material ?? new FloorMaterial(this.room.engine, 111);

    this._type = configuration.type;

    /** Register interactions */
    this.registerInteractions(this._position);

    /** Draw the stair */
    this._draw();
  }

  /**
   * Select which stair should be drawn by it's type.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    if (this._type === StairType.STAIR) {
      /** Straight stair */

      switch (this._position.direction) {
        /** Draw a north stair */
        case Direction.NORTH:
          return this._drawStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 40, y: 12 },
              { x: 32, y: 16 }
            ],
            [
              { x: 8, y: -12 },
              { x: 0, y: 0 }
            ]
          );

        /** Draw an east stair */
        case Direction.EAST:
          return this._drawStair(
            [
              { x: 0, y: 0 },
              { x: 32, y: -16 },
              { x: 40, y: -12 },
              { x: 8, y: 4 }
            ],
            [
              { x: 8, y: -4 },
              { x: 0, y: 0 }
            ]
          );

        /** Draw a south stair */
        case Direction.SOUTH:
          return this._drawStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 40, y: 12 },
              { x: 32, y: 16 }
            ],
            [
              { x: -8, y: -4 },
              { x: 24, y: -12 }
            ]
          );

        /** Draw a west stair */
        case Direction.WEST:
          return this._drawStair(
            [
              { x: 0, y: 0 },
              { x: 32, y: -16 },
              { x: 40, y: -12 },
              { x: 8, y: 4 }
            ],
            [
              { x: -8, y: -12 },
              { x: 24, y: 12 }
            ]
          );
      }
    } else if (this._type === StairType.OUTER_CORNER_STAIR) {
      /** Corner stair */
      switch (this._position.direction) {
        /** Draw a north east stair */
        case Direction.NORTH_EAST:
          return this._drawCornerStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 16, y: 0 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 8, y: 4 },
              { x: 8, y: 4 }
            ],
            [
              { x: 16, y: -8 },
              { x: 24, y: -12 },
              { x: 0, y: 0 },
              { x: 8, y: -4 }
            ]
          );

        /** Draw a south east stair */
        case Direction.SOUTH_EAST:
          return this._drawCornerStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 16, y: 0 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 8, y: 4 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: -8, y: 4 },
              { x: 24, y: -12 },
              { x: 0, y: 0 }
            ]
          );

        /** Draw a south west stair */
        case Direction.SOUTH_WEST:
          return this._drawCornerStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 16, y: 0 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 8, y: 4 },
              { x: 8, y: 4 }
            ],
            [
              { x: -8, y: -4 },
              { x: 16, y: 16 },
              { x: 24, y: -12 },
              { x: -16, y: -8 }
            ]
          );

        /** Draw a north west stair */
        case Direction.NORTH_WEST:
          return this._drawCornerStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 16, y: 0 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 8, y: 4 },
              { x: 8, y: 4 }
            ],
            [
              { x: 8, y: -12 },
              { x: 48, y: 0 },
              { x: 0, y: 0 },
              { x: -8, y: -12 }
            ]
          );
      }
    } else if (this._type === StairType.INNER_CORNER_STAIR) {
      /** Inner corner stair */
      switch (this._position.direction) {
        /** Draw a north east inner stair */
        case Direction.NORTH_EAST:
          return this._drawCornerStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 16, y: 0 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 8, y: 4 },
              { x: 8, y: 4 }
            ],
            [
              { x: -8, y: 12 },
              { x: 16, y: 16 },
              { x: 24, y: -36 },
              { x: -16, y: 8 }
            ]
          );
        case Direction.SOUTH_EAST:
          break;

        /** Draw a south west inner stair */
        case Direction.SOUTH_WEST:
          return this._drawCornerStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 16, y: 0 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 8, y: 4 },
              { x: 8, y: 4 }
            ],
            [
              { x: 16, y: 8 },
              { x: 24, y: -12 },
              { x: 0, y: -24 },
              { x: 8, y: 12 }
            ]
          );

        /** Draw a north west inner stair */
        case Direction.NORTH_WEST:
          return this._drawCornerStair(
            [
              { x: 0, y: 0 },
              { x: 8, y: -4 },
              { x: 16, y: 0 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 8, y: 4 },
              { x: 8, y: 4 }
            ],
            [
              { x: 0, y: 16 },
              { x: -8, y: 4 },
              { x: 24, y: -36 },
              { x: 0, y: 16 }
            ]
          );
      }
    }
  }

  /**
   * Draw the stair using the given points and offsets.
   *
   * @param {IPosition2D[]} [points] - The point list that will be used to draw the stair.
   * @param {IPosition2D[]} [offsets] - The offset list that will be used to draw the stair.
   * @return {void}
   * @private
   */
  private _drawStair(points: IPosition2D[], offsets: IPosition2D[]): void {
    for (let i = 0; i < 4; i++) {
      const step = new Container();
      /** Top face */

      const top = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(1).toNumber(),
          matrix: new Matrix(1, 0.5, 1, -0.5, this._position.y % 2 === 0 ? 32 : 64, this._position.y % 2 === 0 ? 16 : 0)
        })
        .moveTo(points[0].x, points[0].y)
        .lineTo(points[1].x, points[1].y)
        .lineTo(points[2].x, points[2].y)
        .lineTo(points[3].x, points[3].y)
        .lineTo(points[0].x, points[0].y)
        .endFill();

      /** Left face */
      const left = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.8).toNumber(),
          matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
        })
        .moveTo(points[0].x, points[0].y)
        .lineTo(points[0].x, points[0].y + this._thickness)
        .lineTo(points[3].x, points[3].y + this._thickness)
        .lineTo(points[3].x, points[3].y)
        .endFill();

      /** Right face */
      const right = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.71).toNumber(),
          matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
        })
        .moveTo(points[3].x, points[3].y)
        .lineTo(points[3].x, points[3].y + this._thickness)
        .lineTo(points[2].x, points[2].y + this._thickness)
        .lineTo(points[2].x, points[2].y)
        .lineTo(points[3].x, points[3].y)
        .endFill();

      /** And we combine everything */
      step.addChild(top);
      step.addChild(left);
      step.addChild(right);

      /** Add the offsets to the step */
      step.x = offsets[0].x * i;
      step.y = offsets[0].y * i;

      /** Add the step to the stair */
      this.addChild(step);
    }

    /** Positionate the stair */
    this.x = 32 * this._position.x - 32 * this._position.y + offsets[1].x;
    this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z + offsets[1].y;

    /** Set the hit area */
    this.hitArea = new Polygon(
      new Point(0 - offsets[1].x, 0 - offsets[1].y),
      new Point(32 - offsets[1].x, -16 - offsets[1].y),
      new Point(64 - offsets[1].x, 0 - offsets[1].y),
      new Point(32 - offsets[1].x, 16 - offsets[1].y),
      new Point(0 - offsets[1].x, 0 - offsets[1].y)
    );
    /** Set the zIndex */
    this.zIndex = ZOrder.floor(this._position);
  }

  /**
   * Draw the corner stair using the given points, points offsets and offsets.
   *
   * @param {IPosition2D[]} [points] - The point list that will be used to draw the stair.
   * @param {IPosition2D[]} [pointsOffsets] - The offset point list that will be used to draw the stair.
   * @param {IPosition2D[]} [offsets] - The offset list that will be used to draw the stair.
   * @return {void}
   * @private
   */
  private _drawCornerStair(points: IPosition2D[], pointsOffsets: IPosition2D[], offsets: IPosition2D[]): void {
    for (let i = 0; i < 3; i++) {
      const step = new Container();
      /** Top face */

      const top = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(1).toNumber(),
          matrix: new Matrix(1, 0.5, 1, -0.5, this._position.y % 2 === 0 ? 32 : 64, this._position.y % 2 === 0 ? 16 : 0)
        })
        .moveTo(points[0].x + -pointsOffsets[2].x * (2 - i), points[0].y + pointsOffsets[2].y * (2 - i))
        .lineTo(points[1].x + pointsOffsets[1].x * (2 - i), points[1].y + pointsOffsets[1].y * (2 - i))
        .lineTo(points[2].x + pointsOffsets[0].x * (2 - i), points[2].y + pointsOffsets[0].y * (2 - i))
        .lineTo(points[3].x + -pointsOffsets[3].x * (2 - i), points[3].y + pointsOffsets[3].y * (2 - i))
        .lineTo(points[0].x + -pointsOffsets[2].x * (2 - i), points[0].y + pointsOffsets[2].y * (2 - i))
        .endFill();

      /** Left face */
      const left = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.8).toNumber(),
          matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
        })
        .moveTo(points[0].x + -pointsOffsets[2].x * (2 - i), points[0].y + pointsOffsets[2].y * (2 - i))
        .lineTo(
          points[0].x + -pointsOffsets[2].x * (2 - i),
          points[0].y + pointsOffsets[2].y * (2 - i) + this._thickness
        )
        .lineTo(
          points[3].x + -pointsOffsets[3].x * (2 - i),
          points[3].y + pointsOffsets[3].y * (2 - i) + this._thickness
        )
        .lineTo(points[3].x + -pointsOffsets[3].x * (2 - i), points[3].y + pointsOffsets[3].y * (2 - i))
        .endFill();

      /** Right face */
      const right = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.71).toNumber(),
          matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
        })
        .moveTo(points[3].x + -pointsOffsets[3].x * (2 - i), points[3].y + pointsOffsets[3].y * (2 - i))
        .lineTo(
          points[3].x + -pointsOffsets[3].x * (2 - i),
          points[3].y + pointsOffsets[3].y * (2 - i) + this._thickness
        )
        .lineTo(
          points[2].x + -pointsOffsets[0].x * (2 - i),
          points[2].y + pointsOffsets[0].y * (2 - i) + this._thickness
        )
        .lineTo(points[2].x + -pointsOffsets[0].x * (2 - i), points[2].y + pointsOffsets[0].y * (2 - i))
        .lineTo(points[3].x + -pointsOffsets[3].x * (2 - i), points[3].y + pointsOffsets[3].y * (2 - i))
        .endFill();

      /** And we combine everything */
      step.addChild(top);
      step.addChild(left);
      step.addChild(right);

      /** Add the offsets to the step */
      step.x = offsets[3].x * i + offsets[1].x;
      step.y = offsets[3].y * i + offsets[1].y;

      /** zIndex */
      if (this._type === StairType.OUTER_CORNER_STAIR) step.zIndex = -i;
      if (
        this._type === StairType.INNER_CORNER_STAIR ||
        (this._type === StairType.OUTER_CORNER_STAIR && this._position.direction === Direction.SOUTH_WEST)
      )
        step.zIndex = 4 - i;

      /** Add the step to the stair */
      this.addChild(step);
    }

    for (let i = 0; i < 4; i++) {
      const step = new Container();

      /** Top face */
      const top = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(1).toNumber(),
          matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
        })
        .moveTo(points[0].x + pointsOffsets[0].x * (3 - i), points[0].y + pointsOffsets[0].y * (3 - i))
        .lineTo(points[1].x + pointsOffsets[1].x * (3 - i), points[1].y + pointsOffsets[1].y * (3 - i))
        .lineTo(points[2].x + pointsOffsets[2].x * (3 - i), points[2].y + pointsOffsets[2].y * (3 - i))
        .lineTo(points[3].x + pointsOffsets[3].x * (3 - i), points[3].y + pointsOffsets[3].y * (3 - i))
        .lineTo(points[0].x + pointsOffsets[0].x * (3 - i), points[0].y + pointsOffsets[0].y * (3 - i))
        .endFill();

      /** Left face */
      const left = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.8).toNumber(),
          matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
        })
        .moveTo(points[0].x + pointsOffsets[0].x * (3 - i), points[0].y + pointsOffsets[0].y * (3 - i))
        .lineTo(
          points[0].x + pointsOffsets[0].x * (3 - i),
          points[0].y + pointsOffsets[0].y * (3 - i) + this._thickness
        )
        .lineTo(
          points[3].x + pointsOffsets[3].x * (3 - i),
          points[3].y + pointsOffsets[3].y * (3 - i) + this._thickness
        )
        .lineTo(points[3].x + pointsOffsets[3].x * (3 - i), points[3].y + pointsOffsets[3].y * (3 - i))
        .endFill();

      /** Right face */
      const right = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.71).toNumber(),
          matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
        })
        .moveTo(points[3].x + pointsOffsets[3].x * (3 - i), points[3].y + pointsOffsets[3].y * (3 - i))
        .lineTo(
          points[3].x + pointsOffsets[3].x * (3 - i),
          points[3].y + pointsOffsets[3].y * (3 - i) + this._thickness
        )
        .lineTo(
          points[2].x + pointsOffsets[2].x * (3 - i),
          points[2].y + pointsOffsets[2].y * (3 - i) + this._thickness
        )
        .lineTo(points[2].x + pointsOffsets[2].x * (3 - i), points[2].y + pointsOffsets[2].y * (3 - i))
        .lineTo(points[3].x + pointsOffsets[3].x * (3 - i), points[3].y + pointsOffsets[3].y * (3 - i))
        .endFill();

      /** And we combine everything */
      step.addChild(top);
      step.addChild(left);
      step.addChild(right);

      /** Add the offsets to the step */
      step.x = offsets[0].x * i;
      step.y = offsets[0].y * i;

      /** zIndex */
      if (this._type === StairType.INNER_CORNER_STAIR) step.zIndex = 3 - i;

      /** Add the step to the stair */
      this.addChild(step);
    }

    this.sortableChildren = true;

    /** Positionate the stair */
    this.x = 32 * this._position.x - 32 * this._position.y + offsets[2].x;
    this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z + offsets[2].y;

    /** Set the hit area */
    this.hitArea = new Polygon(
      new Point(0 - offsets[2].x, 0 - offsets[2].y),
      new Point(32 - offsets[2].x, -16 - offsets[2].y),
      new Point(64 - offsets[2].x, 0 - offsets[2].y),
      new Point(32 - offsets[2].x, 16 - offsets[2].y),
      new Point(0 - offsets[2].x, 0 - offsets[2].y)
    );
    /** Set the zIndex */
    this.zIndex = ZOrder.floor(this._position);
  }
}
