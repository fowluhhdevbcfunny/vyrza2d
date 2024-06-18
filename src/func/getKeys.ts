import { controller } from "../const/controller";
import { mouseController } from "../const/mouse";

export function getKeys(keys: any[]) {
  return keys.some((key: string | number) => controller[key].down == true);
}

export function getMouseKeys(keys: any[]) {
  return keys.some((key: string | number) => mouseController[key].down == true);
}