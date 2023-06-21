export namespace Dimension {
  export type IPosition2D = Omit<IPosition3D, 'z'>;
  export interface IPosition3D {
    x: number;
    y: number;
    z: number;
  }

  export type IOffsets2D = Omit<IOffsets3D, 'offsetZ'>;
  export interface IOffsets3D {
    offsetX: number;
    offsetY: number;
    offsetZ: number;
  }
}
