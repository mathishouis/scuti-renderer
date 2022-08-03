import {Scuti} from "../../Scuti";
import {Log} from "../../utils/Logger";

export class FurnitureManager {

    private _engine: Scuti;

    private _furnidata: any;

    constructor(engine: Scuti) {

        this._engine = engine;

    }

    public async initialise(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const startDate: Date = new Date();
            this._engine.resources.add('furnidata', 'gamedata/furnidata.json');
            await this._engine.resources.load('furnidata');
            this._furnidata = this._engine.resources.get('furnidata');
            const endDate: Date = new Date();
            Log('Furniture Manager', 'Initialised in ' + (endDate.getTime() - startDate.getTime()) + 'ms.', 'info');
            resolve();
        });

    }

    public getClassName(id: number): string {
        let furni = this._furnidata.floorItems.find((item) => item.id === id);
        if (!furni) furni = this._furnidata.wallItems.find((item) => item.id === id);
        return furni.className;
    }

    /*public async loadFurni(id: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let furni = this._furnidata.floorItems.find((item) => item.id === id);
            if (!furni) furni = this._furnidata.wallItems.find((item) => item.id === id);
            this._engine.resources.add('furni/' + furni.id, 'furniture/' + this.splitColorName(furni.className).name + '/' + this.splitColorName(furni.className).name + '.json');
            await this._engine.resources.load('furni/' + furni.id);
            resolve(furni.className);
        });
    }*/

    public splitColorName(name: string): { colorId: string; name: string } {
        let colorId: string = "";
        if(name.includes("*")) {
            let completeFurniName = name.split("*");
            name = completeFurniName[0];
            colorId = completeFurniName[1];
            return { name, colorId };
        }
        return { name, colorId: undefined };

    }


}