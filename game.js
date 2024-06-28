import Cell from "./cell.js";

const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;


class Game {

    #cells;

    constructor(component) {
        component.style.setProperty("--grid-size", GRID_SIZE);
        component.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        component.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        this.#cells = this.creatCell(component).map((cell, index) => {
            return new Cell(cell, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        });
    }

    get cells(){
        return this.#cells;
    }

    get cellsColumn(){
        return this.#cells.reduce((cellGrid,cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;

            return cellGrid;
        },[]);
    }
    get cellsRow(){
        return this.#cells.reduce((cellGrid,cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;

            return cellGrid;
        },[]);
    }
    creatCell(component) {

        const cells = [];

        for (let i = 0; i < 4 * 4; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cells.push(cell);
            component.appendChild(cell);
        }

        return cells;
    }

    get #emptyCells(){
        return this.#cells.filter(cell => cell.tile == null);
    }

    randomEmptyCell(){
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);

        return this.#emptyCells[randomIndex];
    }
}

export default Game;