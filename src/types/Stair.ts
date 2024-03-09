import { StairType } from '../enums/StairType';
import { Direction } from '../enums/Direction';

export interface Stair {
  type: StairType;
  direction: Direction;
}
