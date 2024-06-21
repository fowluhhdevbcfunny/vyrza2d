import { AudioObject } from "../types/audio";

export class Music extends AudioObject {
  source: string;
  constructor(source: string) {
    super(source);

    this.source = source;
  }

  stop() {
    this.audio.pause();
    this.audio.fastSeek(0);
  }
}
