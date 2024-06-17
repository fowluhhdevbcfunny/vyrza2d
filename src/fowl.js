// FowlJS


// Declare canvas and context for later
var canvas = document.querySelector("#app");
var ctx = canvas.getContext("2d");


// Key list for input
var controller = {
    "ArrowUp":    { down: false },
    "ArrowDown":  { down: false },
    "ArrowLeft":  { down: false },
    "ArrowRight": { down: false },
    "Enter":      { down: false },
    "Shift":      { down: false },
    "Control":    { down: false },
    "Escape":     { down: false },
    "q":          { down: false },
    "w":          { down: false },
    "e":          { down: false },
    "r":          { down: false },
    "t":          { down: false },
    "y":          { down: false },
    "u":          { down: false },
    "i":          { down: false },
    "o":          { down: false },
    "p":          { down: false },
    "a":          { down: false },
    "s":          { down: false },
    "d":          { down: false },
    "f":          { down: false },
    "g":          { down: false },
    "h":          { down: false },
    "j":          { down: false },
    "k":          { down: false },
    "l":          { down: false },
    "z":          { down: false },
    "x":          { down: false },
    "c":          { down: false },
    "v":          { down: false },
    "b":          { down: false },
    "n":          { down: false },
    "m":          { down: false },
    "1":          { down: false },
    "2":          { down: false },
    "3":          { down: false },
    "4":          { down: false },
    "5":          { down: false },
    "6":          { down: false },
    "7":          { down: false },
    "8":          { down: false },
    "9":          { down: false },
    "0":          { down: false },
    ",":          { down: false },
    ".":          { down: false },
    "/":          { down: false },
    ";":          { down: false },
    "'":          { down: false },
    "[":          { down: false },
    "]":          { down: false },
    "-":          { down: false },
    "=":          { down: false },
}


// Basis for a game state
export class BaseState {
    constructor() {
        this.preCreate();
    }

    preCreate() {
        this.bgColor = "#FFFFFF"

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

        this.objects = [];

        this.bg = new RectangleShape(-10000,-10000,10000+canvas.width,10000+canvas.height,this.bgColor);
        this.add(this.bg);

        this.create();
    }

    create() {
        
    }

    preUpdate() {
        this.bg.col = this.bgColor;
        for (let o = 0; o < this.objects.length; o++) {
            this.objects[o].draw();
        }
        this.update();
    }

    update() {

    }

    add(o, e = () => {}) {
        e();
        this.objects.push(o);
    }
}


// Switching scenes
class StateManager {
    constructor() {

    }

    switch(scene) {
        this.scene = scene;
        this.scene.manager = this;
    }
}

var manager = new StateManager();

// For initializing the game
export function startGame(default_scene) {
    manager.switch(default_scene);
}


// Input
export function getKeys(keys) {
    return keys.some((k) => controller[k].down == true);
}


// Getting collisions
export function getCollision(obj1, obj2) {
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


// Drawing
export var colors = {
    white:         "#FFFFFF",
    silver:        "#CCCCCC",
    gray:          "#777777",
    black:         "#000000",
    red:           "#DE3163",
    candyapplered: "#E6192E",
    orange:        "#FF7F50",
    yorange:       "#FFBF00",
    yellow:        "#FFDF00",
    yelleen:       "#9DD62B",
    green:         "#9FE2BF",
    darkgreen:     "#22AB63",
    teal:          "#40E0D0",
    skyblue:       "#00BBFF",
    fowl:          "#0085FF",
    blue:          "#6495ED",
    deepblue:      "#15158A",
    purple:        "#8128D4",
    fushcia:       "#CCCCFF",
    hotpink:       "#DB2162",
    lime:          "#77CC77",
    lemon:         "#CCCC77",
    rgblue:        "#0000FF",
    rgreenb:       "#00FF00",
    redgb:         "#FF0000",
}

export class TileMap {
    constructor(data, tilesize, offsetx = 0, offsety = 0) {
        this.data = data;
        this.offsetX = offsetx;
        this.offsetY = offsety;
        this.tilesize = tilesize;
        this.tilePaths = [];
    }

    addTile(path) {
        this.tilePaths.push(path);
    }

    draw() {
        var tileGroup = new Group();
        for (let y = 0; y < this.data.length; y++) {
            const row = this.data[y];
            for (let x = 0; x < row.length; x++) {
                const tile = this.data[y][x];
                var tileImage = new Sprite(this.tilePaths[tile], this.offsetX+(x*this.tilesize), this.offsetY+(y*this.tilesize));
                tileGroup.add(tileImage);
            }
        }
        tileGroup.draw();
    }

    getCollision(obj1, tilex, tiley) {
        return getCollision(obj1, new Rect(tilex*this.tilesize+this.offsetX, tiley*this.tilesize+this.offsetY, this.tilesize, this.tilesize));
    }
}

export class LineShape {
    constructor(p1,p2,w,col) {
        this.p1 = p1;
        this.p2 = p2;
        this.col = col;
        this.w = w;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.lineWidth = this.w;
        ctx.strokeStyle = this.col;
        ctx.stroke();
    }
}

export class Sprite {
    constructor(src,x,y,scale=1) {
        this.x = x;
        this.y = y;
        this.src = src;
        this.scale = scale;
    }

    draw() {
        const img = new Image();
        img.src = this.src;
        ctx.drawImage(img, this.x, this.y, img.width*this.scale, img.height*this.scale);
    }
}

export class Group {
    constructor() {
        this.objects = [];
    }

    draw() {
        for (let o = 0; o < this.objects.length; o++) {
            this.objects[o].draw();
        }
    }

    add(o, e = () => {}) {
        e();
        this.objects.push(o);
    }
}

export class RectangleShape {
    constructor(x,y,w,h,col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
    }

    draw() {
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
}

export class OutlinedRectangleShape {
    constructor(x,y,w,h,color,outline_color,outline_width) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.outline_color = outline_color;
        this.outline_width = outline_width;
    }

    draw() {
        ctx.fillStyle = this.outline_color;
        ctx.fillRect(this.x,this.y,this.w+(this.outline_width),this.h+(this.outline_width));
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x+(this.outline_width),this.y+(this.outline_width),this.w-(this.outline_width),this.h-(this.outline_width));
    }
}


// Fonts
export class Font {
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


// Drawing text
export class TextLabel {
    constructor(text,x,y,color,font) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.text = text;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = this.font.getMerged();
        ctx.fillText(this.text,this.x,this.y+(this.font.getSize()-10));
    }
}

export class OutlinedTextLabel {
    constructor(text,x,y,color,outline_color,outline_width,font) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.text = text;
        this.outline_color = outline_color;
        this.outline_width = outline_width;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = this.font.getMerged();
        ctx.strokeStyle = this.outline_color;
        ctx.lineWidth = this.outline_width*2;
        ctx.strokeText(this.text,this.x,this.y+(this.font.getSize()-10));
        ctx.fillText(this.text,this.x,this.y+(this.font.getSize()-10));
    }
}


// Music related things
export class Sound {
    constructor(src) {
        this.src = src;
    }

    play() {
        var audio = new Audio(this.src);
        audio.play();
    }
}

export class Music {
    constructor(src) {
        this.src = src;
    }

    play() {
        this.audio = new Audio(this.src);
        audio.play();
    }

    stop() {
        this.audio.pause();
        this.audio.fastSeek(0);
    }
}


// Other classes for util
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}


// Game loop
let now;
let then = performance.now();
let delta;

function gameLoop() {
    let interval = 1000 / 60;

    now = performance.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        manager.scene.preUpdate(delta);
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);