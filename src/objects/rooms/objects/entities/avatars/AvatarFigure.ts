interface FigurePart {
  id: number;
  colors: number[];
}

export class AvatarFigure {
  constructor(public figure: string) {
    console.log(this._parse(figure));
  }

  private _parse(figure: string): Map<string, FigurePart> {
    return new Map(
      figure.split('.').map(part => {
        const data: string[] = part.split('-');
        return [
          data[0],
          {
            id: Number(data[1]),
            colors: data.splice(2, 2).map(color => {
              return Number(color);
            }),
          },
        ] as const;
      }),
    );
  }
}
