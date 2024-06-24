import { canvas } from "../../data/canvas";
import { GameObject } from "../types/object";

export class Camera extends GameObject {
    x: any;
    y: any;
    lastX: any;
    lastY: any;
    lock: boolean = false;
    lockObject: any;
    constructor(x:any = 0, y:any = 0) {
      super(x, y);
      this.x = x;
      this.y = y;
    }
  
    draw() {
      window.ctx.resetTransform();
      if (this.lock) {
        window.ctx.translate(-((this.lockObject.x + (this.lockObject.w / 2)) - canvas().width / 2), -((this.lockObject.y + (this.lockObject.h / 2)) - canvas().height / 2));
      } else {
        window.ctx.translate(-this.x, -this.y);
      }
    }

    follow(object:any) {
        this.lastX = this.x;
        this.lastY = this.y;
        this.lockObject = object;
        this.lock = true;
    }

    unfollow() {
        this.x = this.lastX;
        this.y = this.lastY;
        this.lock = false;
    }
  }
  