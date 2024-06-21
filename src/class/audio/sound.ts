import { AudioObject } from "../types/audio";

export class Sound extends AudioObject {
  source: string;
  constructor(source: string) {
    super(source);
    this.source = source;
  }
}