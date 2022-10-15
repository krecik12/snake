let CELL_SIZE = 10;
//
let longtailSnake = 0;
let snakeGrid = []
//
let canv = document.getElementById('game');
let W = canv.width;
let H = canv.height;
let ctx = canv.getContext('2d');

let numColumns = W / CELL_SIZE;
let numRows = H / CELL_SIZE;




let grid = [];

let FREE = 0;
let HEAD = 1;
let APPLE = 2;


// kierunki
let UP = 0;
let RIGHT = 1;
let DOWN = 2;
let LEFT = 3;

let dir = RIGHT;

let snakeX = 10;
let snakeY = 10;

let randX = ""
let randY = ""
function fillGrid() {
    for (let i = 0; i < numColumns; i++) {
        grid[i] = [];
        for (let j = 0; j < numRows; j++) {
            grid[i][j] = 0;
        }
    }
}

function draw() {
    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < numRows; j++) {
            if (grid[i][j] == FREE) {
                ctx.fillStyle = "black";
            } else if (grid[i][j] == HEAD) {
                ctx.fillStyle = "red";
            } else if (grid[i][j] == APPLE) {
                ctx.fillStyle = "blue";
            }

            ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        }
    }
}

let KEY_W = 119;
let KEY_A = 97
let KEY_D = 100;
let KEY_S = 115;

function setKeyboard() {
    document.onkeypress = function (e) {

        if (e.which == KEY_W && dir != DOWN) {
            console.log("change to UP", e.which);
            dir = UP;
        }
        if (e.which == KEY_A && dir != RIGHT) {
            console.log("change to LEFT", e.which);
            dir = LEFT;
        }
        if (e.which == KEY_D && dir != LEFT) {
            console.log("change to RIGHT", e.which);
            dir = RIGHT;
        }
        if (e.which == KEY_S && dir != UP) {
            console.log("change to DOWN", e.which);
            dir = DOWN;
        }
    };
}



function putApple() {
    randX = Math.floor(Math.random() * numColumns);
    randY = Math.floor(Math.random() * numRows);
    grid[randX][randY] = APPLE;
}

// przede wszystkim jaka jest dlugosc weza?
// waz zaczyna w pozycji x, y 
// push(pos)
let ogonX = []; // wszystkie rzeczy będące ogonem
let ogonY = [];
let dlugoscOgona = 0; // na początku snake jest pojedyncza kropka - dlugosc jest 0, obie tablice są pustlet
function updateGrid() {
    console.log("update", dir, snakeX, snakeY);
    let xDoCzyszczenia = ogonX.shift();
    let yDoCzyszczenia = ogonY.shift();
    // shift nic nie zwroci gdy tablica jest pusta, wiec musimy najpierw sprawdzic czy nie sa undefined:
    if (xDoCzyszczenia && yDoCzyszczenia) {
        // jesli shift() cos zwrocilo to czyscimy to (ustawiamy na FREE)
        grid[xDoCzyszczenia][yDoCzyszczenia] = FREE;
    }
    // snakeX i snakeY to jest to gdzie "teraz bylismy"
    switch (dir) {
        case UP:
            snakeY -= 1;
            break;
        case DOWN:
            snakeY += 1;
            break;
        case LEFT:
            snakeX -= 1;
            break;
        case RIGHT:
            snakeX += 1;
            break;
    }

    grid[snakeX][snakeY] = HEAD;
    ogonX.push(snakeX);
    ogonY.push(snakeY);
}


//sprawdzianie jabółko
function sprawdzJablko() {
    if (snakeX == randX && snakeY == randY) {
        putApple()
        dlugoscOgona += 1
        ogonX.push(snakeX);
        ogonY.push(snakeY);
    }
}
let przerrywnik = false
function sprawdzianieSnake() {
    for (i = 0; i < ogonX.length - 2; i++) {
        if (snakeX == ogonX[i] && snakeY == ogonY[i]) {
            przerrywnik = true
        }
    }
}





//gra
setKeyboard();
fillGrid();

putApple();

draw();

setInterval(function () {
    if (snakeX > -1 && snakeY > -1 && snakeX <= 119 && snakeY <= 59 && przerrywnik === false) {
        updateGrid();
        draw();
        sprawdzJablko();
        sprawdzianieSnake();
    }
    else {
        stop()
    }
}, 200);