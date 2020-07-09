const EASY = 5;
const MEDIUM = 10;
const HARD = 15;
let started = false;
let gameBoard;
let blankTile;
let hackerMode = false;
let difficult = null;

const grid = document.querySelector('.container');
const { forceGridAnimation } = animateCSSGrid.wrapGrid(grid);

function resetGame(n){
    document.querySelector('.container').innerHTML = '';
    if (t){clearInterval(t)};
    timerText.innerHTML='00:00';
    gScore = 0;
    difficulty = null;
    updateMoveCounter();
    started = false;
    [gameBoard, blankTile] = generateBoard(n);
    adjustStyles(n);
    createTiles(gameBoard);
    updateTilePositions();
}
resetGame(3);

//Find Neighbors
//Finds all neighbors of the blank tile and returns an array of their indices
function findBlankNeighbors(board, blank) {
    let neighbors = [];
    //Above
    if (blank[0] !== 0) {
        let coords = [blank[0] - 1, blank[1]];
        neighbors.push(coords);
    }
    //Left
    if (blank[1] !== 0) {
        let coords = [blank[0], blank[1] -1];
        neighbors.push(coords);
    }
    //Right
    if (blank[1] !== board.length -1) {
        let coords = [blank[0], blank[1] + 1];
        neighbors.push(coords);
    }
    //Below
    if (blank[0] !== board.length - 1) {
        let coords = [blank[0] + 1, blank[1]];
        neighbors.push(coords);
    }
    return neighbors;
}

//Shuffle
//This function will shuffle the board by moving tiles until a certain level of difficulty (hScore) is reached
function shuffle(board, difficulty) {
    let hScore = 0;
    while (hScore < difficulty) {
        let neighbors = findBlankNeighbors(gameBoard, blankTile);
        let randomIndex = Math.floor(Math.random() * Math.floor(neighbors.length));
        swap(neighbors[randomIndex], true);
        hScore = calculateH(gameBoard, blankTile);
    }
};

//Swap
//Swap given tile with blankTile
//Increase gScore
function swap(tile, ignoreGScore=false) {
    let tempText = gameBoard[tile[0]][tile[1]];
    let tempIndex = tile;
    let blankText = gameBoard[blankTile[0]][blankTile[1]];
    let blankIndex = JSON.parse(JSON.stringify(blankTile));

    gameBoard[blankIndex[0]][blankIndex[1]] = tempText;
    gameBoard[tempIndex[0]][tempIndex[1]] = blankText;
    blankTile = tempIndex;
    
    if (!ignoreGScore) {
        gScore += 1;
    }
    updateTilePositions();
    updateMoveCounter();
    if (isSolved(gameBoard) && started && !ignoreGScore) {
        puzzleIsSolved();
    }
}

function updateTilePositions() {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[0].length; j++) {
            let tile = document.getElementById(gameBoard[i][j]);
            let gridArea = String.fromCharCode(i * gameBoard.length + j + 97);
            let pos = i * gameBoard.length + j;
            if (tile.style.gridArea !== gridArea) {
                tile.style.gridArea = gridArea;
                tile.dataset.pos = pos;
                forceGridAnimation();
            }
        }
    }
}

//All the event listeners that make the game work
let startEasyButton = document.querySelector('.start-easy');
let startMediumButton = document.querySelector('.start-medium');
let startHardButton = document.querySelector('.start-hard');



startEasyButton.addEventListener('click', () => {
    if (!started) {
        difficulty = 'easy';
        handleStartGame(EASY);
    }
});

startMediumButton.addEventListener('click', () => {
    if (!started) {
        difficulty = 'medium'
        handleStartGame(MEDIUM);
    }
});
startHardButton.addEventListener('click', () => {
    if (!started) {
        difficulty = 'hard';
        handleStartGame(HARD);
    }
});

function addEventListeners(){
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', handleTileClick);
    });
}

function handleStartGame(difficulty) {
    started = true;
    timer(Date.now());
    shuffle(gameBoard, difficulty);
}

function handleTileClick() {
    if (started){
        let coords = [Math.floor(this.dataset.pos / gameBoard.length), this.dataset.pos % gameBoard.length];
        let blankTileNeighbors = findBlankNeighbors(gameBoard, blankTile);
        blankTileNeighbors.forEach(neighbor => {
            if (neighbor[0] === coords[0] && neighbor[1] === coords[1]) {
                swap(coords);
            }
        });
    }
}

function puzzleIsSolved() {
    timer(Date.now(), true);
    setTimeout(showModal, 500);
}

