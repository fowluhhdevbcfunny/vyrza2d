import type { BaseObjectPos } from "../../type/object";
import type { Sprite } from "./sprite";

export class Group {
  objects: Record<string, BaseObjectPos>;
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.objects = {};

    this.x = x;
    this.y = y;
  }

  draw() {
    for (let key in this.objects) {
      this.objects[key].x += this.x;
      this.objects[key].y += this.y;
      this.objects[key].draw();
      this.objects[key].x -= this.x;
      this.objects[key].y -= this.y;
    }
  }

  add(object: Sprite, name: string, callback = () => {}) {
    callback();
    this.objects[name] = object;
  }

  remove(name: string, callback = () => {}) {
    callback();
    delete this.objects[name];
  }

  get(name: string) {
    return this.objects[name];
  }
}
