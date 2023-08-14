import { Scuti } from "../Scuti.ts";

export abstract class GameObject {
    public abstract renderer: Scuti;
    public abstract render(): void;
}