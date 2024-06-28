class Cell {
    #cell;
    #x;
    #y;
    #tile;
    #mergeTile;
    #score;

    constructor(cell, x, y) {
        this.#cell = cell;
        this.#x = x;
        this.#y = y;
    }

    get tile(){
        return this.#tile;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    set tile(val){
        this.#tile = val;

        if(val == null) return;

        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }
    
    get mergeTile(){
        return this.#mergeTile;
    }

    get score(){
        return this.#score;
    }

    set score(val) {
        this.#score = val;
    }
    set mergeTile(val){
        this.#mergeTile = val;
        if(val == null) return;


        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }
    
    canAccept(tile){
        return (this.tile == null || (this.mergeTile == null && this.tile.value == tile.value));
    }

    mergeTiles(){
        if(this.tile == null || this.mergeTile == null) return;

        this.tile.value = this.tile.value + this.mergeTile.value;

        sessionStorage.setItem("score", Number(sessionStorage.getItem("score"))+ this.tile.value);
        
        if(Number(sessionStorage.getItem("score")) > Number(localStorage.getItem("best"))){
            localStorage.setItem("best", Number(sessionStorage.getItem("score")));
        }

        this.mergeTile.remove();
        this.mergeTile = null;
    }
}


export default Cell;