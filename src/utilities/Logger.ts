export class Logger {

    /**
     * Logger name
     * @private
     */
    private readonly _name: string;

    /**
     * Logger class
     * @param name - Logger name
     */
    constructor(name: string) {
        this._name = name;
    }

    /**
     * Send a normal log message in the console
     * @param message
     */
    public log(message: string): void {
        this._log("#078000", "#FFFFFF", message);
    }

    /**
     * Send an error log message in the console
     * @param message
     */
    public error(message: string): void {
        this._log("#E86C5D", "#FFFFFF", message);
    }

    /**
     * Send a warning log message in the console
     * @param message
     */
    public warn(message: string): void {
        this._log("#FFD100", "#000000", message);
    }

    /**
     * Send an info log message in the console
     * @param message
     */
    public info(message: string): void {
        this._log("#EC3262", "#FFFFFF", message);
    }

    /**
     * Send a stylized message in the console
     * @param backgroundColor
     * @param textColor
     * @param message
     * @private
     */
    private _log(backgroundColor: string, textColor: string, message: string): void {
        console.log(`%c ${this.time} %c ${this._name} %c ${message} `, `background: #FFFFFF; color: #000000;`, `background: #000000;`, `background: ${backgroundColor}; color: ${textColor};`)
    }

    /**
     * Return a string of the current time of the day
     */
    public get time(): string {
        const date: Date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    /**
     * Return the name of the logger
     */
    public get name(): string {
        return this._name;
    }

}
