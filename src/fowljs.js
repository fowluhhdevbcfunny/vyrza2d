// FowlJS code, do not modify unless you know what you're doing!

// declares the delta
let delta;

// colors
export var colors = {
    white:     "#FFFFFF",
    silver:    "#CCCCCC",
    gray:      "#777777",
    black:     "#222222",
    red:       "#DE3163",
    orange:    "#FF7F50",
    yorange:   "#FFBF00",
    yellow:    "#FFDF00",
    green:     "#9FE2BF",
    darkgreen: "#22AB63",
    teal:      "#40E0D0",
    fowl:      "#0085FF",
    blue:      "#6495ED",
    fushcia:   "#CCCCFF"
}

// base gamestate class
export class GameState {
    constructor(bgColor) {
        this.canvas = document.querySelector("#app");
        this.ctx = this.canvas.getContext("2d");
    
        this.bgColor = bgColor;
        
        // controller allows input
        this.controller = {
            "ArrowLeft": {down: false},
            "ArrowRight": {down: false},
            "ArrowUp": {down: false},
            "ArrowDown": {down: false},
            "Enter": {down: false},
            "Shift": {down: false},
            "Control": {down: false},
            "a": {down: false},
            "b": {down: false},
            "c": {down: false},
            "d": {down: false},
            "e": {down: false},
            "f": {down: false},
            "g": {down: false},
            "h": {down: false},
            "i": {down: false},
            "j": {down: false},
            "k": {down: false},
            "l": {down: false},
            "m": {down: false},
            "n": {down: false},
            "o": {down: false},
            "p": {down: false},
            "q": {down: false},
            "r": {down: false},
            "s": {down: false},
            "t": {down: false},
            "u": {down: false},
            "v": {down: false},
            "w": {down: false},
            "x": {down: false},
            "y": {down: false},
            "z": {down: false},
            "1": {down: false},
            "2": {down: false},
            "3": {down: false},
            "4": {down: false},
            "5": {down: false},
            "6": {down: false},
            "7": {down: false},
            "8": {down: false},
            "9": {down: false},
            "0": {down: false},
        };

        this.mouseController = {
            0: {down: false},
            1: {down: false},
            2: {down: false},
        }

        this.manager = null;

        this.baseInit();
    }

    baseInit() {
        // get keys down and bind them to controller
        window.addEventListener("keydown", (e) => {
            if (this.controller[e.key]) {
                this.controller[e.key].down = true;
            }
        });

        // remove keys when up
        window.addEventListener("keyup", (e) => {
            if (this.controller[e.key]) {
                this.controller[e.key].down = false;
            }
        });

        window.addEventListener("mousedown", (e) => {
            if (this.mouseController[e.button]) {
                this.mouseController[e.button].down = true;
            }
        });

        window.addEventListener("mouseup", (e) => {
            if (this.mouseController[e.button]) {
                this.mouseController[e.button].down = false;
            }
        });

        this.init();
    }

    init() {
        
    }

    baseDraw() {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw();
    }

    draw() {

    }

    baseUpdate() {
        this.update();
    }

    update() {

    }
}

// the scene manager
class SceneManager {
    constructor() {
        
    }

    start(starting_scene) {
        this.go_to(starting_scene);
    }

    go_to(scene) {
        this.scene = scene;
        this.scene.manager = this;
    }
}

// stuff related to initializing the game
var starting_scene;
var manager = new SceneManager();

// sets the class since you cant in the game script
export function setScene(x) {
    starting_scene = x;
    manager.start(starting_scene);
}

// drawing
export function drawRectangle(x,y,w,h,col,ctx) {
    ctx.fillStyle = col;
    ctx.fillRect(x,y,w,h);
}

export function drawImage(src,x,y,ctx) {
    const img = new Image();
    img.src = src;
    ctx.drawImage(img, x, y);
}

export function drawText(text,x,y,col,font,ctx) {
    ctx.fillStyle = col;
    ctx.font = font;
    ctx.fillText(text,x,y);
}

// updating and delta time
let now;
let then = performance.now();

function gameLoop() {
  let interval = 1000 / 60;

  now = performance.now()
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);

    manager.scene.baseUpdate();
    manager.scene.baseDraw();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
