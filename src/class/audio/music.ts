export class Music {
  source: string;
  audio: HTMLAudioElement;
  ready: boolean;
  constructor(source: string) {
    this.source = source;
    this.ready = false;
    this.audio = new Audio(this.source);
    this.audio.load();
    this.audio.onload = () => {
      this.ready = true;
    };
  }

  play(force?: boolean) {
    if (this.ready || force) this.audio.play();
  }
  stop() {
    this.audio.pause();
    this.audio.fastSeek(0);
  }
}
