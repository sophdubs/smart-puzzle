//Static values we will need to generate the board.
const WIDTH = 498;
const HEIGHT = 498;
let layouts = {
    1:'"a"',
    2:'"a" "b"',
    3:'"a b c" "d e f" "g h i"',
    4:'"a b c d" "e f g h" "i j k l" "m n o p"',
    5:'"a b c d e" "f g h i j" "1k l m n o" "p q r s t" "u v w x y"'
}


//Generates a board of size n^2
//Generates the board and stores it in Gameboard.
//Stores the coordinates of the blank tile in blankTile. 
function generateBoard(n) {
    //Update style to generate board with n*n tiles
    let board = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(i * n + j);
        }
        board.push(row);
    }
    return [board, [n-1,n-1]];
}

function adjustStyles(n) {
    document.documentElement.style.setProperty("--numRows", n);
    document.querySelector('.container').style.gridTemplateAreas = layouts[n];
}

function createTiles(board) {
    document.documentElement.style.setProperty("--tileHeight", `${Math.floor(HEIGHT/board.length)}px`);
    document.documentElement.style.setProperty("--tileWidth", `${Math.floor(WIDTH/board[0].length)}px`);
    let parent = document.querySelector('.container');
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let newTile = document.createElement('div');
            let pos = (i * board.length + j);
            newTile.id = pos;
            newTile.dataset.pos = pos;
            newTile.classList.add('tile');
            newTile.style.backgroundPosition = `${-j * Math.floor(WIDTH/board.length)}px ${-i * Math.floor(HEIGHT/board[0].length)}px`;
            newTile.style.gridArea = String.fromCharCode(pos + 97);
            newTile.style.zIndex = 1;
            if (i === board.length - 1 && j === board[0].length - 1) {
                newTile.style.zIndex = 0;
                newTile.style.background = 'white';
            }
            
            parent.append(newTile);   
        }
    } 
    addEventListeners();
}

function startGame(n) {
  [gameBoard, blankTile] = generateBoard(n);
  adjustStyles(n);
  createTiles(gameBoard);
  updateTilePositions();
}

startGame(3);





