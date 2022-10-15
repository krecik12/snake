let CELL_SIZE = 10; //wielkość pola
//
let snakeGrid = [] //na jakich polach jest snake
//
let canv = document.getElementById('game');
let W = canv.width;
let H = canv.height;
let ctx = canv.getContext('2d');

let numColumns = W / CELL_SIZE; //ilość pól w szerokości
let numRows = H / CELL_SIZE; //ilość pól w wyhsokości



//pole gry 
let grid = [];

//kolory planszy
let FREE = 0;
let HEAD = 1;
let APPLE = 2;


// kierunki
let UP = 0;
let RIGHT = 1;
let DOWN = 2;
let LEFT = 3;

let dir = RIGHT;

let snakeX = 10; //pozycjia startowa x 10 pole od lewej
let snakeY = 10; //pozycjia startowa y 10 pole od góry

let randX = "" //jabółko x
let randY = "" //jabółko y
//stwirzenie pola gry
function fillGrid() {
    for (let i = 0; i < numColumns; i++) {
        grid[i] = [];
        for (let j = 0; j < numRows; j++) {
            grid[i][j] = 0;
        }
    }
}

//rysowanie okna gry
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

let KEY_W = 119; //W
let KEY_A = 97 //A
let KEY_D = 100; //D
let KEY_S = 115; //S

//STEROWANIE WASD
function setKeyboard() {
    document.onkeypress = function (e) {

        if (e.which == KEY_W && dir != DOWN) {
            dir = UP; //zmiana kierunku na góre
        }
        if (e.which == KEY_A && dir != RIGHT) {
            dir = LEFT; //zmiana kierunku na lewo
        }
        if (e.which == KEY_D && dir != LEFT) {
            dir = RIGHT; //zmiana kierunku na prawo
        }
        if (e.which == KEY_S && dir != UP) {
            dir = DOWN; //zmiana kierunku na dół
        }
    };
}


//jabółko pojawienie się 
function putApple() {
    randX = Math.floor(Math.random() * numColumns);
    randY = Math.floor(Math.random() * numRows);
    grid[randX][randY] = APPLE;
}


let ogonX = []; //pozycjia ogona oś x
let ogonY = []; //pozycjia ogona oś y
let dlugoscOgona = 0; //długość ogona

//zmiana długosci ogona i jego zamienianie spowrotem
function updateGrid() {
    let xDoCzyszczenia = ogonX.shift();
    let yDoCzyszczenia = ogonY.shift();

    if (xDoCzyszczenia && yDoCzyszczenia) {
        grid[xDoCzyszczenia][yDoCzyszczenia] = FREE;
    }
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

//kolizjia węża
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
    if (snakeX >= 0 && snakeY >= 0 && snakeX < numColumns && snakeY < numRows && przerrywnik === false) {
        updateGrid();
        draw();
        sprawdzJablko();
        sprawdzianieSnake();
    } else {
        stop()
    }
}, 200);