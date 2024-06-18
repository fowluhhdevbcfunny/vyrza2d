import { CollisionSides } from "../const/collisionSides";
import type { Rect } from "../fowl";

export function getCollision(
  obj1: { x: number; w: any; y: number; h: any },
  obj2: Rect
) {
  if (
    obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2.y
  ) {
    return true;
  } else {
    return false;
  }
}
export function getCollisionSide(
  obj1: { w: number; h: number; x: number; y: number },
  obj2: { w: number; h: number; x: number; y: number }
) {
  if (getCollision(obj1, obj2)) {
    var obj1HalfW = obj1.w / 2;
    var obj1HalfH = obj1.h / 2;
    var obj2HalfW = obj2.w / 2;
    var obj2HalfH = obj2.h / 2;
    var obj1CenterX = obj1.x + obj1.w / 2;
    var obj1CenterY = obj1.y + obj1.h / 2;
    var obj2CenterX = obj2.x + obj2.w / 2;
    var obj2CenterY = obj2.y + obj2.h / 2;

    var diffX = obj1CenterX - obj2CenterX;
    var diffY = obj1CenterY - obj2CenterY;

    var minXDist = obj1HalfW + obj2HalfW;
    var minYDist = obj1HalfH + obj2HalfH;

    var depthX = diffX > 0 ? minXDist - diffX : -minXDist - diffX;
    var depthY = diffY > 0 ? minYDist - diffY : -minYDist - diffY;

    if (depthX != 0 && depthY != 0) {
      if (Math.abs(depthX) < Math.abs(depthY)) {
        if (depthX > 0) {
          return CollisionSides.LEFT;
        } else {
          return CollisionSides.RIGHT;
        }
      } else {
        if (depthY > 0) {
          return CollisionSides.BOTTOM;
        } else {
          return CollisionSides.TOP;
        }
      }
    }
  }
}