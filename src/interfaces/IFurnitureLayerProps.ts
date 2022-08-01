import { BLEND_MODES, Texture } from "pixi.js";

export interface IFurnitureLayerProps {
    texture: Texture,
    name: string,
    alpha: number,
    tint?: string,
    z: number,
    blendMode: BLEND_MODES
}