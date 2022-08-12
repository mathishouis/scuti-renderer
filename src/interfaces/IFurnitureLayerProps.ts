import { BLEND_MODES, Texture } from "pixi.js";
import {Room} from "..";

export interface IFurnitureLayerProps {
    texture: Texture,
    name: string,
    alpha: number,
    tint?: number,
    blendMode: BLEND_MODES,
    frame: number,
    flip?: boolean,
    z: number,
    layerZ: number,
    room: Room
}