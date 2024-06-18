import { controller } from "../const/controller";

export function getKeys(keys: any[]) {
  return keys.some((key: string | number) => controller[key].down == true);
}