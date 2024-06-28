
class Tile {
    #tile;
    #x;
    #y;
    #value;

    constructor(container,value = Math.random() > .5 ? 2 : 4){
        this.#tile = document.createElement("div");
        this.#tile.classList.add("tile");
        container.appendChild(this.#tile);
        this.value = value;
    }

    get value(){
        return this.#value;
    }

    /**
     * @param {any} val
     */
    set value(val){
        this.#value = val;
        this.#tile.textContent = val;
        const power = Math.log2(val);
        const tileBackground = 100 - power * 9;
        this.#tile.style.setProperty("--tile-background",`${tileBackground}%`);
        this.#tile.style.setProperty("--tile-text",`${tileBackground <= 50 ? 90 : 10}%`)
    }

    /**
     * @param {string | null} val
     */
    set x(val){
        this.#x = val;
        this.#tile.style.setProperty("--x",val);
    }

    /**
     * @param {string | null} val
     */
    set y(val){
        this.#y = val;
        this.#tile.style.setProperty("--y",val);
    }

    remove(){
        this.#tile.remove();
    }

    waitForTransition(){
        return new Promise(resolve => {
            this.#tile.addEventListener("transitionend",resolve, { once: true });
        });
    }
}

export default Tile;