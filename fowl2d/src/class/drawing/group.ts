import { GameObject } from "../object";

export class Group extends GameObject {
  objects: Record<string, GameObject>;
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    super(x, y);

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

  add(object: GameObject, name: string, callback = () => {}) {
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
