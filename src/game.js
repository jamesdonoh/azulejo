import { Tile } from './tile';

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.tiles = this.generateTiles();

        this.playArea = this.createPlayArea();

        console.log('Game created (width is %s, height is %s)', this.width, this.height);
    }

    get numPositions() {
        return this.width * this.height;
    }

    start() {
        console.log('Game started');
    }

    generateTiles() {
        let tiles = [];

        for (let i = 0; i < this.numPositions; i++) {
            let tile = new Tile();
            tiles.push(tile);
        }
        
        return tiles;
    }

    tileAt(x, y) {
        if (x < 0 || x >= this.playArea.length)
            return null;

        let col = this.playArea[x];

        if (y < 0 || y >= col.length)
            return null;

        return col[y];
    }

    canPlaceTile(tile, x, y) {
        let tileAtTarget = this.tileAt(x, y);
        if (tileAtTarget && tileAtTarget !== tile)
            return false;

        let topNeighbour = this.tileAt(x, y - 1),
            rightNeighbour = this.tileAt(x + 1, y),
            bottomNeighbour = this.tileAt(x, y + 1),
            leftNeighbour = this.tileAt(x - 1, y);

        let canPlace = (!topNeighbour || topNeighbour === tile || topNeighbour.bottom === tile.top)
            && (!rightNeighbour || rightNeighbour === tile || rightNeighbour.left === tile.right)
            && (!bottomNeighbour || bottomNeighbour === tile || bottomNeighbour.top === tile.bottom)
            && (!leftNeighbour || leftNeighbour === tile || leftNeighbour.right === tile.left);

        //console.log(`[${x},${y}] = ${canPlace}, topNeighbour = ${topNeighbour}, rightNeighbour = ${rightNeighbour}, bottomNeighbour = ${bottomNeighbour}, leftNeighbour = ${leftNeighbour}`)

        return canPlace;
    }

    placeTile(tile, x, y) {
        this.playArea[x][y] = tile;

        if (tile.coords !== null) {
            this.playArea[tile.coords[0]][tile.coords[1]] = null;
        }

        tile.coords = [x, y];

        console.log(`${tile} played at position ${x},${y}`);
    }

    createPlayArea() {
        let emptyArray = size =>
            Array.apply(null, new Array(size));

        let playArea = emptyArray(this.width)
            .map(row => emptyArray(this.height));

        return playArea;
    }
}

export { Game };
