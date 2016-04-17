var COLOURS = [];
for (let i = 0; i < 4; i++) {
    COLOURS.push(randomColor());
}

var coinFlipIsHeads = () => Math.round(Math.random()) === 0;

class UI {
    constructor(documentObj, parentSelector, game) {
        this.documentObj = documentObj;
        this.parentSelector = parentSelector;
        this.game = game;
    }

    get parentEl() {
        return this.documentObj.querySelector(this.parentSelector);
    }

    setupGrids() {
        let startGrid = this.createGrid('grid--start', true),
            endGrid = this.createGrid('grid--end', false);

        let parentEl = this.parentEl;
        parentEl.appendChild(startGrid);
        parentEl.appendChild(endGrid);
    }

    isInStartGrid(element) {
        return element.parents('.grid--start').length > 0;
    }

    isAcceptable(tileElement, positionElement) {
        if (this.isInStartGrid(positionElement)) {
            return true;
        }

        let tile = tileElement.data('tile'),
            coords = positionElement.data('coords');

        return this.game.canPlaceTile(tile, coords[0], coords[1]);
    }

    placeTile(tileElement, positionElement) {
        positionElement.append(tileElement);
        
        tileElement.css({
            left: 0,
            top: 0
        });

        let tile = tileElement.data('tile'),
            coords = positionElement.data('coords');

        if (this.isInStartGrid(positionElement)) {
            this.game.removeTile(tile);
        } else {
            this.game.placeTile(tile, coords[0], coords[1]);
        }
    }

    enableDragging(sourceSelector, targetSelector, acceptableTargetHoverClass) {
        $(sourceSelector).draggable({
            stack: sourceSelector,
            revert: true,
            revertDuration: 200
        });

        // Prevent $ from clobbering our 'this' reference
        let boundIsAcceptable = this.isAcceptable.bind(this),
            boundPlaceTile = this.placeTile.bind(this);

        $(targetSelector).droppable({
            hoverClass: acceptableTargetHoverClass,
            activeClass: 'grid__position--allowed',
            accept: function (tileDiv) {
                return boundIsAcceptable(tileDiv, $(this));
            },
            drop: function (event, ui) {
                boundPlaceTile(ui.draggable, $(this));
            }
        });
    }

    startGame() {
        this.enableDragging('.tile', '.grid__position', 'grid__position--dropping');
        this.game.start();
    }

    createDiv(classes = []) {
        let element = this.documentObj.createElement('div');

        if (typeof classes === 'string') {
            element.className = classes;
        } else if (Array.isArray(classes) && classes.length > 0) {
            element.className = classes.join(' ');
        }

        return element;
    }

    createGrid(type, hasTiles) {
        let grid = this.createDiv(['grid', type]),
            tiles = this.game.tiles,
            x = 0, y = 0;

        for (let tile of tiles) {
            let position = this.createDiv('grid__position');

            if (hasTiles) {
                position.appendChild(this.createDomTile(tile));
            }

            /*
            if (type === 'grid--end' && coinFlipIsHeads()) {
                position.className += ' grid__position--available';
            }
            */

            $(position).data('coords', [x, y]);

            grid.appendChild(position);

            if (++x >= this.game.width) {
                x = 0;
                y++;
            }
        }

        return grid;
    }

    createDomTile(tile) {
        let domTile = this.createDiv('tile');

        domTile.style['border-top-color'] = this.getColourFromScheme(tile.top);
        domTile.style['border-right-color'] = this.getColourFromScheme(tile.right);
        domTile.style['border-bottom-color'] = this.getColourFromScheme(tile.bottom);
        domTile.style['border-left-color'] = this.getColourFromScheme(tile.left);

        $(domTile).data('tile', tile);

        return domTile;
    }

    getColourFromScheme(code) {
        return COLOURS[code];
    }
}

export { UI };
