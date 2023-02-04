export class Logger {

    private readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public log(message: string): void {
        this._log("#078000", "#FFFFFF", message);
    }

    public error(message: string): void {
        this._log("#E86C5D", "#FFFFFF", message);
    }

    public warn(message: string): void {
        this._log("#FFD100", "#000000", message);
    }

    public info(message: string): void {
        this._log("#EC3262", "#FFFFFF", message);
    }

    private _log(backgroundColor: string, textColor: string, message: string): void {
        console.log(`%c ${this.time} %c ${this._name} %c ${message} `, `background: #FFFFFF; color: #000000;`, `background: #000000;`, `background: ${backgroundColor}; color: ${textColor};`)
    }

    public get time(): string {
        const date: Date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    public get name(): string {
        return this._name;
    }

}
