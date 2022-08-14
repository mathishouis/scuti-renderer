export interface IFurniData {
    id: number,
    className: string,
    name: string,
    description: string,
    furniLine: string,
    offerId: number,
    adUrl: string,
    excludeDynamic: boolean,
    specialType: number,
    customParams: string,
    dimensions: {
        x: number,
        y: number,
        defaultDirection: number
    },
    canStandOn: boolean,
    canSitOn: boolean,
    canLayon: boolean
}