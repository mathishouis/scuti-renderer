import { Vector2D, Vector3D } from "../types/Vector.ts";
import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";
import { Layer } from "@pixi/layers";
import {WallMaterial} from "../objects/rooms/materials/WallMaterial.ts";

export interface ICubeConfiguration {
    material?: FloorMaterial | WallMaterial;
    size: Vector3D;
    offsets?: Record<number, Vector2D>;
    zOrders?: Record<number, number>;
    layer?: Layer;
}
