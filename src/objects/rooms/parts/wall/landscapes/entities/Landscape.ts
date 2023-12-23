import { Vector2D } from '../../../../../../types/Vector';

export interface Extra {
  max: number;
  texture: string;
  offsets: Vector2D[];
}

export interface Column {
  texture: string;
  extras: Extra[];
}

export interface Matrice {
  id: string;
  repeat: 'random' | 'none';
  align: 'top' | 'bottom' | 'stretch';
  columns: Column[];
}

export interface LandscapeSpritesheet {
  frames: [];
  textures: [];
  data: {
    materials: {
      floors: [];
      walls: [];
      landscapes: {
        data: [];
        matrices: Matrice[];
      };
    };
  };
}

export interface Landscape {
  id: number;
  layers: {
    static: [];
    animated: [];
  };
}
