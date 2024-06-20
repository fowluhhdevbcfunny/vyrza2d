import { controller, mouseController } from "../const/controller";

export function getKeys(keys: any[]) {
  return keys.some((key: string | number) => controller[key].down == true);
}

export function getMouseKeys(keys: any[]) {
  return keys.some((key: string | number) => mouseController[key].down == true);
}

export function getMousePos(canvas:HTMLCanvasElement, event:any) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
  };
}