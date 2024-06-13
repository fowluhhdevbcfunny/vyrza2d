# FowlJS

Game framework built in vanilla JavaScript.



### HOW TO USE

Make an index.html file with the following code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
</head>
<style>
    #app {
        border: 3px solid black;
    }
</style>
<body>
    <canvas id="app" width="640" height="480"></canvas>
    <script src="src/main.js" type="module"></script>
</body>
</html>
```

Then make a src/ folder and add 2 files: a copy of FowlJS as a javascript file, and a file called main.js. In the main.js file add this code:
```js
import { Game, setClass } from "./fowljs.js";

class MainGame extends Game {
  constructor(bgColor) {
    super(bgColor);
  }

  gameInit() {
    
  }

  gameUpdate() {
    
  }

  gameDraw() {

  }
}

setClass(new MainGame("#777777"));
```

Then if you run the index.html file from earlier, you should see this:

![blank canvas](./docs/game_example.png)

A blank canvas with an outline as put in the HTML file under ```<style>```.


### Developers

- FowluhhDevBCFunny

