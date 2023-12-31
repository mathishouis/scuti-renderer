export type Vector3D = Record<'x' | 'y' | 'z', number>;

export type Vector2D = Omit<Vector3D, 'z'>;

export type OffsetVector2D = {
  x: number;
  y: number;
  offsets: Vector2D;
};
