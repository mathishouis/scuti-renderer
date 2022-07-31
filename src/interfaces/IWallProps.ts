import { Texture } from 'pixi.js';

export interface IWallProps {
    color: number,
    thickness: number,
    texture?: Texture,
    door?: boolean
}