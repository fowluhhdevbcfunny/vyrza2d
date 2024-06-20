export class Font {
  size: number;
  name: string;
  constructor(size: number = 24, name: string = "serif") {
    this.size = size;
    this.name = name;
  }

  getMerged() {
    return this.size.toString() + "px " + this.name;
  }

  getSize() {
    return this.size;
  }

  getName() {
    return this.name;
  }
}

