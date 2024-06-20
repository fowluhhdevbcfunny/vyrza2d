import { GameObject } from "../object";

export class Group extends GameObject {
  objects: Array<GameObject>;
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    super(x, y);;

    this.objects = [];

    this.x = x;
    this.y = y;
  }

  draw() {
    for (let key in this.objects) {
      if (this.objects[key].exists) {
        if (this.objects[key].visible) {

          this.objects[key].x += this.x;
          this.objects[key].y += this.y;

          this.objects[key].draw();

          this.objects[key].x -= this.x;
          this.objects[key].y -= this.y;

        }
      }
    }
  }

  add(object: GameObject, callback = () => {}) {
    callback();
    this.objects.push(object);
  }
}

