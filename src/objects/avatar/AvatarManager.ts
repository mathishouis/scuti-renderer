import {Scuti} from "../../Scuti";

export class AvatarManager {

    private _engine: Scuti;

    private _figuredata: any;
    private _figuremap: any;

    constructor(engine: Scuti) {

        this._engine = engine;

    }

    public async initialise(): Promise<void> {

        return new Promise(async (resolve, reject) => {
            this._figuredata = this._engine.resources.get('figuredata');
            this._figuremap = this._engine.resources.get('figuremap');
            resolve();
        });

    }

    public getColor(type: string, colorId: number): string {
        let paletteId = this._figuredata.setTypes.find(set => set.type === type).paletteId;
        let palette = this._figuredata.palettes.find(palette => palette.id === paletteId);
        let color = palette.colors.find(color => color.id === colorId);
        return "0x" + color.hexCode;
    }

    public getParts(type: string, setId: number) {
        let parts = [];
        let sets = this._figuredata.setTypes.find(set => set.type === type).sets;
        let set = sets.find(set => set.id === setId);
        set.parts.forEach((part) => {
            let libraries = this._figuremap.libraries.find(lib => lib.parts.find(libPart => libPart.id === part.id));
            parts.push(libraries);
        });
        return parts;
    }

    public splitLookFigure(figure: string): {} {
        let finalFigure = figure.split(".").map(part => {
            const data = part.split("-");
            return {
                type: data[0],
                partId: Number(data[1]),
                colors: data.splice(2, 2).map(color => {
                    return Number(color);
                })
            };
        });
        return finalFigure;
    }


}