class Tile {
    constructor() {
        let edges = [];

        var randomInt = (min, max) => (Math.floor(Math.random() * (max + 1))) + min;

        for (let i = 0; i < 4; i++) {
            edges.push(randomInt(0, 3));
        }

        [this.top, this.right, this.bottom, this.left] = edges;
        this.coords = null;
    }

    toString() {
        return `[Tile ${this.top},${this.bottom},${this.right},${this.left}]`;
    }
}

export { Tile };
