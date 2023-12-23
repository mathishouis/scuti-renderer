import { Vector2D } from '../../../../../../types/Vector';
import { Texture } from 'pixi.js';

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
  textures: Record<string, Texture>;
  data: {
    materials: {
      floors: [];
      walls: [];
      landscapes: {
        data: [];
        matrices: Matrice[];
        animations: [];
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
