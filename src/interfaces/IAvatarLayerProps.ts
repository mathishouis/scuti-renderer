import { BLEND_MODES, Texture } from "pixi.js";
import {Room} from "..";

export interface IAvatarLayerProps {
    flip?: boolean,
    direction: number,
    textures: Texture[],
    tint: number,
    alpha: number,
    name: string,
    z: number,
    /*layerZ: number,
    room: Room*/
}