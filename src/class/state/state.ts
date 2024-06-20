import { canvas } from "../../const/canvas";
import { controller, mouseController} from "../../const/controller";
import { RectangleShape } from "../drawing/rectangle";
import type { StateManager } from "./stateManager";
import { Camera } from "../drawing/camera";
import type { GameObject } from "../object";
import { getMousePos } from "../../func/getKeys";
import { colors } from "../../fowl";

export class State {
  constructor() {
    this.prePreload();
  }

  mousePos:any;

  manager!: StateManager;
  preloads!: Record<string, any>;
  objects!: Array<GameObject>;

  prePreload() {
    this.preloads = {};
    this.preload();
  }

  preload() {}

  finishPreload() {
    this.preCreate();
  }

  bg!: RectangleShape;
  bgColor!: string;

  camera!: Camera;

  preCreate() {
    this.mousePos = { "x": 0, "y": 0 };

    this.bgColor = colors[0].white;

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

    window.addEventListener("pointermove", (e) => {
      this.mousePos = getMousePos(canvas(), e);
    });

    this.objects = [];

    this.camera = new Camera();

    this.bg = new RectangleShape(
      -10000,
      -10000,
      10000 + canvas().width,
      10000 + canvas().height,
      this.bgColor
    );

    this.add(this.bg);
    this.add(this.camera);
    this.create();
  }

  create() {}

  preUpdate(delta: number) {
    this.bg.color = this.bgColor;
    for (let key in this.objects) {
      if (this.objects[key].exists) {
        if (this.objects[key].visible) {
          this.objects[key].draw();
        }
      }
    }
    this.update(delta);
  }

  update(delta: number) {}

  add(object: GameObject, callback = () => {}) {
    callback();
    this.objects.push(object);
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
