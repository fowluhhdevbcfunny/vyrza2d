export class Sound {
  source: string;
  constructor(source: string) {
    this.source = source;
  }

  play() {
    var audio = new Audio(this.source);
    audio.play();
  }
}