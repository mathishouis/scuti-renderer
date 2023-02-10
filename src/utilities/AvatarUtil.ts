import {AvatarFigure, IAvatarPart, IActionDefinition} from "../interfaces/Avatar.interface";
import {Assets} from "pixi.js";
import {AvatarAction} from "../objects/avatars/actions/AvatarAction";

// TODO: Move all this class directly into Avatar class

export class AvatarUtil {

    public static parseFigure(figure: string): AvatarFigure {
        return new Map(figure.split(".").map(part => {
            const data: string[] = part.split("-");
            return [
                data[0],
                {
                    setId: Number(data[1]),
                    colors: data.splice(2, 2).map(color => {
                        return Number(color);
                    })
                },
            ] as const;
        }));
    }

    public static getParts(type: string, setId: number): IAvatarPart[] {
        const figureData: [] = Assets.get('figures/figuredata');
        const figureMap: [] = Assets.get('figures/figuremap');
        const hiddenLayers: [] = figureData.settype[type]?.set[setId]["hiddenLayers"];
        let parts = [];
        let set = figureData.settype[type]?.set[setId];
        set?.parts.forEach((part) => {
            let libId = figureMap.parts[part.type][String(part.id)];
            let lib = figureMap.libs[libId];
            //console.log(part.type, libId);
            part.lib = lib;
            parts.push(part);
        });
        if(hiddenLayers !== undefined) {
            parts = parts.filter(part => !hiddenLayers.includes(part.type));
        }
        return parts;
    }

    public static getAction(action: string): AvatarAction[] {
        const avatarActions: IActionDefinition[] = Assets.get('figures/actions');
        const actions: AvatarAction[] = Object.keys(avatarActions).filter((item: AvatarAction) => avatarActions[item].assetpartdefinition === action) as AvatarAction[];
        if(actions === undefined) return [AvatarAction.Default];

        return actions;
    }

    public static getColor(type: string, colorId: number): number {
        const figureData: [] = Assets.get('figures/figuredata');
        let paletteId = figureData.settype[type].paletteid;
        let palette = figureData.palette[String(paletteId)];
        if(palette[String(colorId)] === undefined) return Number('0xFFFFFF');
        return Number('0x' + palette[String(colorId)].color);
    }

    public static getDrawOrder(type: string, action: string, direction: number) {
        const drawOrder: [] = Assets.get("figures/draworder");
        if(drawOrder[action] === undefined) action = "std";
        return Number(Object.entries(drawOrder[action][direction]).find(entry => entry[1] === type)[0]);
    }

}
