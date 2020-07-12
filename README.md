# Smart Puzzle

![](smart_puzzle.gif)

## Project Description
Smart puzzle is a seemingly simple puzzle app with a built in solver. The solver uses the A* path finding algorithm to determine the sequence of moves required to solve the puzzle with the fewest moves. 

This project is hosted on GH pages and can be found here:   
https://sophdubs.github.io/smart-puzzle/

## Project Stack
- JavaScript
- HTML
- CSS
- CSS Grid

## Project Features
- User can choose easy, medium or hard when starting the puzzle
- When a user choses a difficulty, the board is shuffled and a timer is started
- When a user clicks a tile adjacent to the blank tile, they will swap spots and the move counter will increase by one
- The user can press pause which will blurr the puzzle and pause the timer
- The user can press "solve" and let the solver complete the puzzle
- When the puzzle is solved, a modal appears with the user's move count and solve time

## Under the Hood
- When shuffling the puzzle, the puzzle always starts from a solved state and swaps the tiles to be "X" moves away from its solved state depending on the chosen difficulty. This ensures that every generated puzzle is guaranteed to be solvable. 
- I implemented a basic priority queue which is used in the solver.js file.
- The solver uses a variation of the A* path finding algorithm. The basic logic from shuffled state to solved state is as follows:
  * We initialize and keep track of two sets: the openSet and the visitedSet. 
  * The visitedSet is a set of states we have already seen. It is used to avoid revisiting a past state and getting stuck in a never ending loop. It is initialized as an empty array.
  * The open set is a list of all the current "hypothetical" states of our puzzle. It is initialized as a priority queue containing the current shuffled state. 
  * The priority queue (openSet) orders the states by fScore. The fScore of each state takes into consideration the number of moves away from the solved state and the number of moves already made to get to the current state. We can generalize this by saying the priority queue orders the states by closest to furthest from the solved state. 
  * While the openSet is not empty and the puzzle is not solved, we will repeat the following steps:
    * Dequeue the hypothetical state with lowest fScore
    * Check if solved 
    * Generate hypothetical states for each possible move from the current state 
    * Add current state to visitedSet
    * Add all newly generated hypothetical states to openSet IF they are not in the visitedSet already
    * Repeat until solved state is found
  * Once the solved state is found, we retrace the moves that were made to get to this state. I acheived this by adding a "prev" attribute to each newly generated hypothetical state which stores the current state.
  * By determining the sequence of hypothetical states the puzzle adopts from shuffled to solved, we can now build an array of moves needed to solve the puzzle. This is where the solver finally calls the makeMoves function and solves the puzzle for the user.

## Upcoming Features:
- Variable number of tiles on the board (already implemented in the code, but not integrated to the UI)
- Responsive design

** Note: This app is actually a simplified version of my previous project "new-8-puzzle". That project includes a leader board among other distracting features. I chose to remake it with a more streamlined/simple approach to showcase the solver, which was a hidden "hacker" button on my previous project. **