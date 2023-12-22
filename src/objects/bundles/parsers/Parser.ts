import { Buffer } from 'buffer';

export abstract class Parser {
  public abstract test(name: string): boolean;
  public abstract parse<T>(buffer: Buffer): Promise<T>;
}
