import { RoomEntity } from '../RoomEntity.ts';
import { Room } from '../../../Room.ts';
import { RoomObjectVisualization } from '../../RoomObjectVisualization.ts';
import { Direction } from '../../../../../enums/Direction.ts';
import { Vector3D } from '../../../../../types/Vector.ts';
import { AvatarFigure } from './AvatarFigure.ts';

interface Configuration {
  figure: string;
  headDirection: Direction;
  bodyDirection: Direction;
  position: Vector3D;
}

export class Avatar extends RoomEntity {
  public room: Room;
  public visualization: RoomObjectVisualization;

  private _figure: AvatarFigure;
  private _headDirection: Direction;
  private _bodyDirection: Direction;
  private _position: Vector3D;

  constructor({ figure, headDirection, bodyDirection, position }: Configuration) {
    super();

    this._figure = new AvatarFigure(figure);
    this._headDirection = headDirection;
    this._bodyDirection = bodyDirection;
    this._position = position;
  }

  public render(): void {}

  public update(): void {}

  public destroy(): void {}
}
