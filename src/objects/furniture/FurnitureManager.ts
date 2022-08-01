import {Scuti} from "../../Scuti";

export class FurnitureManager {

    private _engine: Scuti;

    private _furnidata: any;

    constructor(engine: Scuti) {

        this._engine = engine;

    }

    public async initialise(): Promise<void> {

        return new Promise(async (resolve, reject) => {
            this._furnidata = this._engine.resources.get('furnidata');
            resolve();
        });

    }

    public async loadFurni(id: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let furni;
            for (let index in this._furnidata.floorItems) {
                if (this._furnidata.floorItems[index].id === id) {
                    furni = this._furnidata.floorItems[index];
                }
            }
            if (!furni) for (let index in this._furnidata.wallItems) {
                if (this._furnidata.wallItems[index].id === id) {
                    furni = this._furnidata.wallItems[index];
                }
            }
            this._engine.resources.add('furni/' + furni.id, 'furniture/' + this.splitColorName(furni.className).name + '/' + this.splitColorName(furni.className).name + '.json');
            await this._engine.resources.load('furni/' + furni.id);
            resolve(furni.className);
        });
    }

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