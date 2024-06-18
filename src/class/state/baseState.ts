import { canvas } from "../../const/canvas";
import { controller } from "../../const/controller";
import { RectangleShape } from "../drawing/rectangle";
import type { BaseObject } from "../../type/object";
import type { StateManager } from "./stateManager";
import { mouseController } from "../../const/mouse";
import { Camera } from "../drawing/camera";

export class BaseState {
  constructor() {
    this.prePreload();
  }

  manager!: StateManager;
  preloads!: Record<string, any>;
  objects!: Record<string, BaseObject>;

  async prePreload() {
    this.preloads = {};
    await this.preload();
  }

  async preload() {}

  finishPreload() {
    this.preCreate();
  }

  bg!: RectangleShape;
  bgColor!: string;

  camera!: Camera;

  preCreate() {
    this.bgColor = "#FFFFFF";

    window.addEventListener("keydown", (e) => {
      if (controller[e.key]) {
        controller[e.key].down = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (controller[e.key]) {
        controller[e.key].down = false;
      }
    });

    window.addEventListener("pointerdown", (e) => {
      if (mouseController[e.button]) {
        mouseController[e.button].down = true;
      }
    });

    window.addEventListener("pointerup", (e) => {
      if (mouseController[e.button]) {
        mouseController[e.button].down = false;
      }
    });

    this.objects = {};

    this.camera = new Camera();

    this.bg = new RectangleShape(
      -10000,
      -10000,
      10000 + canvas().width,
      10000 + canvas().height,
      this.bgColor
    );

    this.add(this.bg, "default-background");
    this.add(this.camera, "default-camera");
    this.create();
  }

  create() {}

  preUpdate(delta: number) {
    this.bg.color = this.bgColor;
    for (let key in this.objects) {
      this.objects[key].draw();
    }
    this.update(delta);
  }

  update(delta: number) {}

  add(object: BaseObject, name: string, callback = () => {}) {
    callback();
    this.objects[name] = object;
  }

  remove(name: string | number, callback = () => {}) {
    callback();
    delete this.objects[name];
  }

  addPreload(name: string, data: any) {
    this.preloads[name] = data;
  }

  getPreload(name: string) {
    return this.preloads[name];
  }

  resetState() {
    for (var v in this.objects){
      delete this.objects[v];
    }
    for (var v in this.preloads){
      delete this.preloads[v];
    }
    this.prePreload();
  }
}
