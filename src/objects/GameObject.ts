import { Scuti } from '../Scuti';

export abstract class GameObject {
  public abstract renderer: Scuti;
  public abstract render(): void;
}
