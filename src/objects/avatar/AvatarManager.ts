import {Scuti} from "../../Scuti";
import {Log} from "../../utils/Logger";

export class AvatarManager {

    private _engine: Scuti;

    private _figuredata: any;
    private _figuremap: any;
    private _drawOrder: any;

    constructor(engine: Scuti) {

        this._engine = engine;

    }

    public async initialise(): Promise<void> {

        return new Promise(async (resolve, reject) => {
            const startDate: Date = new Date();
            this._engine.resources.add('figuredata', 'gamedata/figuredata.json');
            this._engine.resources.add('figuremap', 'gamedata/figuremap.json');
            this._engine.resources.add('draworder', 'gamedata/draworder.json');
            await this._engine.resources.load('figuredata');
            await this._engine.resources.load('figuremap');
            await this._engine.resources.load('draworder');
            this._figuredata = this._engine.resources.get('figuredata');
            this._figuremap = this._engine.resources.get('figuremap');
            this._drawOrder = this._engine.resources.get('draworder');
            const endDate: Date = new Date();
            Log('Avatar Manager', 'Initialised in ' + (endDate.getTime() - startDate.getTime()) + 'ms.', 'info');
            resolve();
        });

    }

    public getColor(type: string, colorId: number): number {
        let paletteId = this._figuredata.settype[type].paletteid;
        let palette = this._figuredata.palette[String(paletteId)];
        if(palette[String(colorId)] === undefined) return Number('0xFFFFFF');
        return Number('0x' + palette[String(colorId)].color);
    }

    public getParts(type: string, setId: number) {
        let parts = [];
        let set = this._figuredata.settype[type].set[setId];
        set.parts.forEach((part) => {
            let libId = this._figuremap.parts[part.type][String(part.id)];
            let lib = this._figuremap.libs[libId];
            //console.log(part.type, libId);
            part.lib = lib;
            parts.push(part);
        });
        return parts;
    }

    public getDrawOrder(type: string, action: string, direction: number) {
        if(this._drawOrder[action] === undefined) action = "std";
        return Number(Object.entries(this._drawOrder[action][direction]).find(entry => entry[1] === type)[0]);
    }

    public splitLookFigure(figure: string): { partId: number; type: string; colors: number[] }[] {
        return figure.split(".").map(part => {
            const data = part.split("-");
            return {
                type: data[0],
                partId: Number(data[1]),
                colors: data.splice(2, 2).map(color => {
                    return Number(color);
                })
            };
        });
    }

    public isHeadPart(type: string): boolean {
        return type === "hd" || type === "hr" || type === "hrb" || type === "ey" || type === "fc";
    }


}