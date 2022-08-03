import { BLEND_MODES, Texture } from "pixi.js";

export interface IAvatarLayerProps {
    direction: number,
    textures: Texture[],
    tint: number,
    alpha: number,
    name: string,
    z: number
}