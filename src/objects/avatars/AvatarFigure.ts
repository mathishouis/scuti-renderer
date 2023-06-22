import { Assets } from 'pixi.js';

import type { Figure, IAvatarPart, IFigureData, IFigureMap } from '../../types';
import type { Avatar } from './Avatar';
import { AvatarBodyPart } from './visualizations/AvatarBodyPart';

export class AvatarFigure {
  private readonly _avatar: Avatar;
  private _figure!: Figure;

  constructor(avatar: Avatar, figure: string) {
    this._avatar = avatar;

    this._parseFigure(figure);
    this._parseBodyParts();
  }

  private _parseFigure(figure: string): void {
    // todo!(): Handle split errors for the string

    this._figure = new Map(
      figure.split('.').map((part) => {
        const data = part.split('-');
        return [
          data[0],
          {
            setId: Number(data[1]),
            colors: data.splice(2, 2).map((color) => Number(color))
          }
        ] as const;
      })
    );
  }

  private _parseBodyParts(): void {
    return this._figure.forEach((set, type) => {
      const parts = this._getParts(type, set.setId);

      return this._avatar.bodyParts.push(
        new AvatarBodyPart(this._avatar, {
          type,
          setId: set.setId,
          colors: set.colors,
          parts,
          actions: this._avatar.actions
        })
      );
    });
  }

  private _getParts(type: string, setId: number): IAvatarPart[] {
    const figureData = Assets.get<IFigureData>('figures/figuredata');
    const figureMap = Assets.get<IFigureMap>('figures/figuremap');
    let parts: IAvatarPart[] = [];

    if (!Boolean(figureData.settype[type]?.set[setId])) return parts;

    const hiddenLayers = figureData.settype[type].set[setId].hiddenLayers;
    const set = figureData.settype[type].set[setId];

    set?.parts.forEach((part) => {
      const libId = figureMap.parts[part.type][String(part.id)];
      const lib = figureMap.libs[libId];
      //console.log(part.type, libId);
      part.lib = lib;
      parts.push(part);
    });

    if (hiddenLayers !== undefined) {
      parts = parts.filter((part) => !hiddenLayers.includes(part.type));
    }

    return parts;
  }

  public get figure(): Figure {
    return this._figure;
  }
}
