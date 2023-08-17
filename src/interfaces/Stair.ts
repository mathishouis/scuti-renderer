import { StairType } from "./StairType.ts";
import { Direction } from "./Position.ts";

export interface Stair {
    type: StairType;
    direction: Direction;
}
