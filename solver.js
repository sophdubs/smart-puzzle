let gScore = 0;

//Calculates the sum of the heuristic scores of all the tiles on the board
function calculateH(board, blank) {
    let totalH = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let hScore = calculateManhattenDistance(i, j, board, blank);
            totalH += hScore;
        }
    }
    return totalH;
};

//Using manhatten distance (estimate of how many moves away each tile is from the solved state) as our heuristic function. 
function calculateManhattenDistance(row, column, board, blank) {
    //Do not count manhatten distance for blank tiles position
    if (row === blank[0] && column === blank[1]) {
        return 0;
    }
    //Return 0 if tile is already in its solved position
    else if (board[row][column] === (row * board.length + column)) {
        return 0;
    } 
    //Return how many moves away tile is from its solved position
    //Tile can only move vertically or horizontally, not diagonally
    else {
        let tileText = board[row][column];
        let tileSolvedIndex = [Math.floor(tileText/board.length), tileText % board.length];
        let distance = Math.abs(row - tileSolvedIndex[0]) + Math.abs(column - tileSolvedIndex[1]);
        return distance;
    }
}

function solvePuzzle(gameBoard) {
    let hScore = calculateH(gameBoard, blankTile);
    let currentState = JSON.parse(JSON.stringify(gameBoard));
    let self = null;
    let prev = null;
    let neighbors = findBlankNeighbors(currentState, blankTile);
    
    let startState = {
        hScore,
        currentState,
        self,
        prev,
        neighbors,
        gScore, 
        blank: blankTile
    }

    let visited = {};
    let open = {};
    
    let openSet = new PriorityQueue();
    openSet.enqueue(startState);
    open[startState.currentState] = true;
    i = 0;
    
    while (openSet.length !== 0) {
        // Dequeue the state with lowest fScore
        // Add its state to the visited set and remove it from the open set
        let curr = openSet.dequeue();
        visited[curr.currentState] = true;
        delete open[curr.currentState];
        
        //Check if current state is the solved state
        if (isSolved(curr.currentState)) {
            let path = reconstructPath(curr);
            return makeMoves(path);

        } else {
            let neighborStates = processNeighbors(curr);
            let validStates = neighborStates.filter(neighborState=> !visited[neighborState.currentState] && !open[neighborState.currentState]);
            validStates.forEach(validState => {
                open[validState.currentState] = true;
                openSet.enqueue(validState);
            });
        }
        i++;
    }
}

function hypotheticalSwap(board, blank, tile) {
    let startState = JSON.parse(JSON.stringify(board));
    
    let tempText = startState[tile[0]][tile[1]];
    let tempIndex = tile;
    let blankText = startState[blank[0]][blank[1]];
    let blankIndex = blank;

    startState[blankIndex[0]][blankIndex[1]] = tempText;
    startState[tempIndex[0]][tempIndex[1]] = blankText;
    blank = tempIndex;

    return [startState, blank];
}

function processNeighbors(curr) {
    let neighbors = curr.neighbors;
    let neighborStates = [];
    for (let i = 0; i < neighbors.length; i++) {
        [hypotheticalState, hypotheticalBlankTile] = hypotheticalSwap(curr.currentState, curr.blank, neighbors[i]);
        let hypotheticalHScore = calculateH(hypotheticalState, hypotheticalBlankTile);
        let hypotheticalNeighbors = findBlankNeighbors(hypotheticalState, hypotheticalBlankTile);

        let newState = {
            hScore: hypotheticalHScore,
            currentState: hypotheticalState,
            self: neighbors[i],
            prev: curr,
            neighbors: hypotheticalNeighbors,
            gScore: curr.gScore + 1, 
            blank: hypotheticalBlankTile
        }

        neighborStates.push(newState);
    }  
    return neighborStates;
}

//Checks if current board state is solved
function isSolved(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] !== i * arr.length + j) {
                return false;
            }
        }
    }
    return true;
}

function reconstructPath(current){
    let path = [];
    while(current.prev !== null) {
        path.push(current.blank);
        current = current.prev;
    }
    return path.reverse();
}

function makeMoves(path) {
    for (let i = 0; i < path.length; i++) {
        setTimeout(() =>{
            swap(path[i])
        }, i * 250);
    }
    return 'SOLVED';
}
