export class SlicedSprite {
  src: any;
  scale: number;
  img: HTMLImageElement;
  x: any;
  y: any;
  sx: any;
  sy: any;
  sw: any;
  sh: any;
  w!: number;
  h!: number;
  constructor(
    src: any,
    x: any,
    y: any,
    sx: any,
    sy: any,
    sw: any,
    sh: any,
    scale = 1
  ) {
    this.src = src;
    this.scale = scale;
    this.img = new Image();
    this.x = x;
    this.y = y;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
  }

  draw() {
    this.img.src = this.src;
    this.w = this.img.width * this.scale;
    this.h = this.img.height * this.scale;
    window.ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
