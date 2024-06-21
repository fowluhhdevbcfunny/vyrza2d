export class Event {
    callback:() => {}
    constructor(callback:() => {}) {
        this.callback = callback;
    }

    run() {
        this.callback();
    }
}

