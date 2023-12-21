export type Vector3D = Record<'x' | 'y' | 'z', number>;

export type Vector2D = Omit<Vector3D, 'z'>;
