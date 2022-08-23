import { BLEND_MODES, Texture } from "pixi.js";
import {Room, Scuti} from "..";

export interface IAvatarLayerProps {
    flip?: boolean,
    direction: number,
    textures: Texture[],
    tint: number,
    alpha: number,
    name: string,
    z: number,
    engine: Scuti,
    room: Room
    /*layerZ: number,
    room: Room*/
}