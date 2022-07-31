import { Texture } from 'pixi.js';
import { WallType } from "../types/WallType";

export interface IWallProps {
    color: number,
    tileThickness: number,
    thickness: number,
    texture?: Texture,
    door?: boolean,
    maxZ: number,
    type: WallType,
    roomZ: number,
}