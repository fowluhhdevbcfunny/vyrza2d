export class Basic {
    x:number;
    y:number;

    exists:boolean = true;
    
    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
    }

    kill() {
        this.exists = false;
    }
}

