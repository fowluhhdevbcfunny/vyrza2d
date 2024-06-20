// src/class/state/stateManager.ts
class StateManager {
  scene;
  constructor() {
  }
  switch(scene) {
    this.scene = scene;
    this.scene.manager = this;
  }
}

// src/func/init.ts
function initEngine(baseScene) {
  let canvas = document.querySelector("#app");
  let ctx = canvas.getContext("2d");
  window.ctx = ctx;
  let manager = new StateManager;
  window.manager = manager;
  manager.switch(baseScene);
  let now;
  let then = Date.now();
  let delta;
  function gameLoop() {
    let interval = 16.666666666666668;
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      then = now - delta % interval;
      if (manager.scene === undefined)
        alert("BAD");
      else
        manager.scene.preUpdate(delta);
    }
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
}
function getManager() {
  return window.manager;
}

// src/class/audio/music.ts
class Music {
  source;
  audio;
  ready;
  constructor(source) {
    this.source = source;
    this.ready = false;
    this.audio = new Audio(this.source);
    this.audio.load();
    this.audio.onload = () => {
      this.ready = true;
    };
  }
  play(force) {
    if (this.ready || force)
      this.audio.play();
  }
  stop() {
    this.audio.pause();
    this.audio.fastSeek(0);
  }
}

// src/class/audio/sound.ts
class Sound {
  source;
  constructor(source) {
    this.source = source;
  }
  play() {
    var audio = new Audio(this.source);
    audio.play();
  }
}

// src/class/drawing/font.ts
class Font {
  size;
  name;
  constructor(size = 24, name = "serif") {
    this.size = size;
    this.name = name;
  }
  getMerged() {
    return this.size.toString() + "px " + this.name;
  }
  getSize() {
    return this.size;
  }
  getName() {
    return this.name;
  }
}

// src/class/object.ts
class GameObject {
  x;
  y;
  w;
  h;
  visible = true;
  exists = true;
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
  }
  kill() {
    this.exists = false;
  }
}

// src/class/drawing/group.ts
class Group extends GameObject {
  objects;
  x;
  y;
  constructor(x = 0, y = 0) {
    super(x, y);
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
  add(object2, callback = () => {
  }) {
    callback();
    this.objects.push(object2);
  }
}

// src/class/drawing/outlinedRectangle.ts
class OutlinedRectangleShape extends GameObject {
  x;
  y;
  w;
  h;
  color;
  outline_color;
  outline_width;
  constructor(x, y, w, h, color, outline_color, outline_width) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.outline_color = outline_color;
    this.outline_width = outline_width;
  }
  draw() {
    window.ctx.fillStyle = this.outline_color;
    window.ctx.fillRect(this.x, this.y, this.w + this.outline_width, this.h + this.outline_width);
    window.ctx.fillStyle = this.color;
    window.ctx.fillRect(this.x + this.outline_width, this.y + this.outline_width, this.w - this.outline_width, this.h - this.outline_width);
  }
}

// src/class/drawing/outlineText.ts
class OutlinedTextLabel extends GameObject {
  x;
  y;
  font;
  color;
  text;
  outline_color;
  outline_width;
  constructor(text, x, y, color, outline_color, outline_width, font) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.text = text;
    this.outline_color = outline_color;
    this.outline_width = outline_width;
  }
  draw() {
    window.ctx.fillStyle = this.color;
    window.ctx.font = this.font.getMerged();
    window.ctx.strokeStyle = this.outline_color;
    window.ctx.lineWidth = this.outline_width * 2;
    window.ctx.strokeText(this.text, this.x, this.y + (this.font.getSize() - 10));
    window.ctx.fillText(this.text, this.x, this.y + (this.font.getSize() - 10));
  }
}

// src/class/drawing/rectangle.ts
class RectangleShape extends GameObject {
  x;
  y;
  w;
  h;
  color;
  constructor(x, y, w, h, color) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  draw() {
    window.ctx.fillStyle = this.color;
    window.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

// src/class/drawing/slicedSprite.ts
class SlicedSprite extends GameObject {
  src;
  scale;
  img;
  x;
  y;
  w;
  h;
  sx;
  sy;
  sw;
  sh;
  constructor(src, x, y, w, h, sx, sy, sw, sh, scale = 1) {
    super(x, y, w, h);
    this.src = src;
    this.scale = scale;
    this.img = new Image;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
  }
  draw() {
    this.img.src = this.src;
    window.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w * this.scale, this.h * this.scale);
  }
}

// src/class/drawing/sprite.ts
class Sprite extends GameObject {
  src;
  scale = 1;
  img;
  x;
  y;
  w = 0;
  h = 0;
  constructor(src, x, y, scale = 1) {
    super(x, y);
    this.src = src;
    this.scale = scale;
    this.img = new Image;
    this.x = x;
    this.y = y;
  }
  draw() {
    this.img.src = this.src;
    this.w = this.img.width * this.scale;
    this.h = this.img.height * this.scale;
    window.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

// src/class/drawing/text.ts
class TextLabel extends GameObject {
  x;
  y;
  font;
  color;
  text;
  constructor(text, x, y, color, font) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.text = text;
  }
  draw() {
    window.ctx.fillStyle = this.color;
    window.ctx.font = this.font.getMerged();
    window.ctx.fillText(this.text, this.x, this.y + (this.font.getSize() - 10));
  }
}

// src/const/collisionSides.ts
var CollisionSides;
(function(CollisionSides2) {
  CollisionSides2[CollisionSides2["TOP"] = 0] = "TOP";
  CollisionSides2[CollisionSides2["BOTTOM"] = 1] = "BOTTOM";
  CollisionSides2[CollisionSides2["LEFT"] = 2] = "LEFT";
  CollisionSides2[CollisionSides2["RIGHT"] = 3] = "RIGHT";
})(CollisionSides || (CollisionSides = {}));

// src/func/collision.ts
function getCollision(obj1, obj2) {
  if (obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x && obj1.y < obj2.y + obj2.h && obj1.y + obj1.h > obj2.y) {
    return true;
  } else {
    return false;
  }
}
function getCollisionSide(obj1, obj2) {
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

// src/class/drawing/tileMap.ts
class TileMap extends GameObject {
  data;
  offsetX;
  offsetY;
  tileSize;
  tilePaths;
  constructor(data, tileSize, offsetX = 0, offsetY = 0) {
    super(offsetX, offsetY);
    this.data = data;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.tileSize = tileSize;
    this.tilePaths = [];
  }
  addTile(path) {
    this.tilePaths.push(path);
  }
  draw() {
    var tileGroup = new Group;
    for (let y = 0;y < this.data.length; y++) {
      const row = this.data[y];
      for (let x = 0;x < row.length; x++) {
        const tile = this.data[y][x];
        var tileImage = new Sprite(this.tilePaths[tile], this.offsetX + x * this.tileSize, this.offsetY + y * this.tileSize);
        tileGroup.add(tileImage);
      }
    }
    tileGroup.draw();
  }
  getCollision(obj1, tileX, tileY) {
    let tile = new GameObject(tileX * this.tileSize + this.offsetX, tileY * this.tileSize + this.offsetY, this.tileSize, this.tileSize);
    return getCollision(obj1, tile);
  }
}

// src/const/canvas.ts
var canvas = () => document.querySelector("#app");

// src/const/controller.ts
var controller = {
  ArrowUp: { down: false },
  ArrowDown: { down: false },
  ArrowLeft: { down: false },
  ArrowRight: { down: false },
  Enter: { down: false },
  Shift: { down: false },
  Control: { down: false },
  Escape: { down: false },
  " ": { down: false },
  q: { down: false },
  w: { down: false },
  e: { down: false },
  r: { down: false },
  t: { down: false },
  y: { down: false },
  u: { down: false },
  i: { down: false },
  o: { down: false },
  p: { down: false },
  a: { down: false },
  s: { down: false },
  d: { down: false },
  f: { down: false },
  g: { down: false },
  h: { down: false },
  j: { down: false },
  k: { down: false },
  l: { down: false },
  z: { down: false },
  x: { down: false },
  c: { down: false },
  v: { down: false },
  b: { down: false },
  n: { down: false },
  m: { down: false },
  "1": { down: false },
  "2": { down: false },
  "3": { down: false },
  "4": { down: false },
  "5": { down: false },
  "6": { down: false },
  "7": { down: false },
  "8": { down: false },
  "9": { down: false },
  "0": { down: false },
  ",": { down: false },
  ".": { down: false },
  "/": { down: false },
  ";": { down: false },
  "'": { down: false },
  "[": { down: false },
  "]": { down: false },
  "-": { down: false },
  "=": { down: false }
};
var mouseController = {
  0: { down: false },
  1: { down: false },
  2: { down: false }
};

// src/class/drawing/camera.ts
class Camera extends GameObject {
  x;
  y;
  lastX;
  lastY;
  lock = false;
  lockObject;
  constructor(x = 0, y = 0) {
    super(x, y);
    this.x = x;
    this.y = y;
  }
  draw() {
    window.ctx.resetTransform();
    if (this.lock) {
      window.ctx.translate(-(this.lockObject.x + this.lockObject.w / 2 - canvas().width / 2), -(this.lockObject.y + this.lockObject.h / 2 - canvas().height / 2));
    } else {
      window.ctx.translate(-this.x, -this.y);
    }
  }
  follow(object10) {
    this.lastX = this.x;
    this.lastY = this.y;
    this.lockObject = object10;
    this.lock = true;
  }
  unfollow() {
    this.x = this.lastX;
    this.y = this.lastY;
    this.lock = false;
  }
}

// src/func/getKeys.ts
function getKeys(keys) {
  return keys.some((key) => controller[key].down == true);
}
function getMouseKeys(keys) {
  return keys.some((key) => mouseController[key].down == true);
}
function getMousePos(canvas3, event) {
  var rect = canvas3.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

// src/class/state/state.ts
class State {
  constructor() {
    this.prePreload();
  }
  mousePos;
  manager;
  preloads;
  objects;
  prePreload() {
    this.preloads = {};
    this.preload();
  }
  preload() {
  }
  finishPreload() {
    this.preCreate();
  }
  bg;
  bgColor;
  camera;
  preCreate() {
    this.mousePos = { x: 0, y: 0 };
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
    this.camera = new Camera;
    this.bg = new RectangleShape(-1e4, -1e4, 1e4 + canvas().width, 1e4 + canvas().height, this.bgColor);
    this.add(this.bg);
    this.add(this.camera);
    this.create();
  }
  create() {
  }
  preUpdate(delta) {
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
  update(delta) {
  }
  add(object10, callback = () => {
  }) {
    callback();
    this.objects.push(object10);
  }
  addPreload(name, data) {
    this.preloads[name] = data;
  }
  getPreload(name) {
    return this.preloads[name];
  }
  resetState() {
    for (var v in this.objects) {
      delete this.objects[v];
    }
    for (var v in this.preloads) {
      delete this.preloads[v];
    }
    this.prePreload();
  }
}

// src/const/colors.ts
var colors = {
  0: {
    white: "#FFFFFF",
    darkWhite: "#EEEEEE",
    darkerWhite: "#DDDDDD",
    silver: "#CCCCCC",
    darkSilver: "#BBBBBB",
    darkerSilver: "#AAAAAA",
    deepSilver: "#999999",
    deeperSilver: "#888888",
    gray: "#777777",
    dimGray: "#666666",
    dimmerGray: "#555555",
    darkGray: "#444444",
    darkerGray: "#333333",
    deepGray: "#222222",
    lightBlack: "#111111",
    black: "#000000"
  },
  1: {
    red: "#DE3163",
    orange: "#FF7F50",
    yellow: "#FFDF00",
    yellowGreen: "#9DD62B",
    green: "#9FE2BF",
    teal: "#40E0D0",
    fowl: "#0085FF",
    violet: "#4A2AE8",
    deepBlue: "#15158A",
    hotPink: "#DB2162"
  },
  2: {
    candyAppleRed: "#E6192E",
    yellowOrange: "#FFBF00",
    gold: "#E8E84A",
    lemon: "#CCCC77",
    lime: "#77CC77",
    darkGreen: "#22AB63",
    skyBlue: "#00BBFF",
    blue: "#6495ED",
    purple: "#8128D4",
    fuchsia: "#CCCCFF"
  },
  3: {
    fullRed: "#FF0000",
    fullYellow: "#FFFF00",
    fullGreen: "#00FF00",
    fullTeal: "#00FFFF",
    fullBlue: "#0000FF",
    fullMagenta: "#FF00FF"
  },
  4: {
    variables: "#E06C75",
    numbers: "#D19A66",
    classes: "#E5C07B",
    strings: "#98C379",
    special: "#56B6C2",
    functions: "#61AFEF",
    keywords: "#C678DD",
    foreground: "#D4D4D4",
    comments: "#7F848E"
  }
};

// src/func/startGame.ts
function startGame(defaultScene) {
  console.log("Fowl2D - FowluhhDev, Me1ad, and Kat21");
  initEngine(defaultScene);
}

// src/class/physics/collisionBound.ts
class CollisionBound {
  x;
  y;
  w;
  h;
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
export {
  startGame,
  getMouseKeys,
  getManager,
  getKeys,
  getCollisionSide,
  getCollision,
  canvas as getCanvas,
  controller,
  colors,
  TileMap,
  TextLabel,
  StateManager,
  State,
  Sprite,
  Sound,
  SlicedSprite,
  RectangleShape,
  OutlinedTextLabel,
  OutlinedRectangleShape,
  Music,
  Group,
  GameObject,
  Font,
  CollisionSides,
  CollisionBound,
  Camera
};
