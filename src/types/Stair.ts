import { StairType } from '../enums/StairType.ts';
import { Direction } from '../enums/Direction.ts';

export type Stair = {
  type: StairType;
  direction: Direction;
};
