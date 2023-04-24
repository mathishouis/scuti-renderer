/**
 * Material class that regroup the methods to make beautiful logs.
 *
 * @class
 * @memberof Scuti
 */
export class Logger {
  /**
   * The logger name (the name shown on the left of the log).
   *
   * @member {string}
   * @private
   */
  private readonly _name: string

  /**
   * @param {string} [name] - The logger name.
   */
  constructor(name: string) {
    this._name = name
  }

  /**
   * Send a normal log message into the console.
   *
   * @param {string} [message] - The message that will be logged into the console.
   * @return {void}
   * @public
   */
  public log(message: string): void {
    this._log('#078000', '#FFFFFF', message)
  }

  /**
   * Send an error log message in the console.
   *
   * @param {string} [message] - The message that will be logged into the console.
   * @return {void}
   * @public
   */
  public error(message: string): void {
    this._log('#E86C5D', '#FFFFFF', message)
  }

  /**
   * Send a warning log message in the console.
   *
   * @param {string} [message] - The message that will be logged into the console.
   * @return {void}
   * @public
   */
  public warn(message: string): void {
    this._log('#FFD100', '#000000', message)
  }

  /**
   * Send an info log message in the console.
   *
   * @param {string} [message] - The message that will be logged into the console.
   * @return {void}
   * @public
   */
  public info(message: string): void {
    this._log('#EC3262', '#FFFFFF', message)
  }

  /**
   * Send a stylized message in the console.
   *
   * @param {string} [backgroundColor] - The color of the background of the message.
   * @param {string} [textColor] - The color of the message.
   * @param {string} [message] - The message that will be logged into the console.
   * @return {void}
   * @public
   */
  private _log(backgroundColor: string, textColor: string, message: string): void {
    console.log(
      `%c ${this.time} %c ${this._name} %c ${message} `,
      `background: #FFFFFF; color: #000000;`,
      `background: #000000;`,
      `background: ${backgroundColor}; color: ${textColor};`
    )
  }

  /**
   * Reference of the current time of the day formatted in a string.
   *
   * @member {string}
   * @readonly
   * @public
   */
  public get time(): string {
    const date: Date = new Date()
    return String(date.getHours()) + ':' + String(date.getMinutes()) + ':' + String(date.getSeconds())
  }

  /**
   * Reference of the logger name.
   *
   * @member {string}
   * @readonly
   * @public
   */
  public get name(): string {
    return this._name
  }
}
