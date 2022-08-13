import { BLEND_MODES, Texture } from "pixi.js";
import {Room, Scuti} from "..";

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
    room: Room,
    engine: Scuti,
    interactive: boolean,
    tag?: string
}