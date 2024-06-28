import Game from "./game.js";
import Tile from "./tile.js";

const board = document.querySelector(".game");
const bestScore = document.querySelector(".best-score");
const score = document.querySelector(".score");

if(!localStorage.getItem("best")){
    localStorage.setItem("best",0);
}
else{
    bestScore.innerText = `Best Score: ${localStorage.getItem("best")}`
}

if(!sessionStorage.getItem("score")){
    sessionStorage.setItem("score",0);
}

const grid = new Game(board);


grid.randomEmptyCell().tile = new Tile(board);
grid.randomEmptyCell().tile = new Tile(board);

inputSetup();

function inputSetup() {
    window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(e) {
    switch (e.key) {
        case "ArrowUp": 
        if(!canMoveUp()){
            inputSetup();
            return;
        }
        await moveUp(); break;
        case "ArrowDown": 
        if(!canMoveDown()){
            inputSetup();
            return;
        }
        await moveDown(); break;
        case "ArrowLeft": 
        if(!canMoveLeft()){
            inputSetup();
            return;
        }
        await moveLeft(); break;
        case "ArrowRight": 
        if(!canMoveRight()){
            inputSetup();
            return;
        }
        await moveRight(); break;
        default: inputSetup(); return;
    }

    grid.cells.forEach(cell => cell.mergeTiles());

    score.innerHTML = `Score:${sessionStorage.getItem("score")}`;

    console.log(sessionStorage.getItem("score"))
    console.log(Number(sessionStorage.getItem("score")) > Number(localStorage.getItem("best")));
    if(Number(sessionStorage.getItem("score")) > Number(localStorage.getItem("best"))){
        bestScore.innerText = `Best Score:${sessionStorage.getItem("score")}`;
    }
    
    const newTile = new Tile(board);
    grid.randomEmptyCell().tile = newTile;

    if(!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()){
        
        alert("You lose");
        location.reload();
        sessionStorage.setItem("score",0);
        return;
    }

    inputSetup();
}

function moveUp() {
    return slideTiles(grid.cellsColumn);
}
function moveDown() {
    return slideTiles(grid.cellsColumn.map(col => [...col].reverse()));
}
function moveLeft() {
    return slideTiles(grid.cellsRow);
}
function moveRight() {
    return slideTiles(grid.cellsRow.map(col => [...col].reverse()));
}

function slideTiles(cells) {
    return new Promise(resolve => {
        cells.flatMap(g => {
            const promises = [];
            for (let i = 1; i < g.length; i++) {
                const cell = g[i];
                if (cell.tile == null) continue;
                let lastValidCell;
    
                for (let j = i - 1; j >= 0; j--) {
                    const moveCell = g[j];
                    if (!moveCell.canAccept(cell.tile)) break;
    
                    lastValidCell = moveCell;
                }
    
                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition());
                    if (lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile;
                    }
                    else {
                        lastValidCell.tile = cell.tile;
                    }
                    cell.tile = null;
                }
            }
            resolve(promises);
        })
    });
}

function canMoveUp(){
    return canMove(grid.cellsColumn);
}
function canMoveDown(){
    return canMove(grid.cellsColumn.map(col => [...col].reverse()));
}
function canMoveLeft(){
    return canMove(grid.cellsRow);
}
function canMoveRight(){
    return canMove(grid.cellsRow.map(col => [...col].reverse()));
}

function canMove(cells){
    return cells.some(g => {
        return g.some((cell,index) => {
            if(index === 0) return false;

            if(cell.tile == null) return false;

            const moveCell = g[index - 1];
            return moveCell.canAccept(cell.tile);
        })
    });
}