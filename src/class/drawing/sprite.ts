import { ctx } from "../../const/ctx";

const context = ctx();

export class Sprite {
  src: string;
  scale: number;
  img: HTMLImageElement;
  x: any;
  y: any;
  w!: number;
  h!: number;
  constructor(src: string, x: any, y: any, scale = 1) {
    this.src = src;
    this.scale = scale;
    this.img = new Image();
    this.x = x;
    this.y = y;
  }

  draw() {
    this.img.src = this.src;
    this.w = this.img.width * this.scale;
    this.h = this.img.height * this.scale;
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
