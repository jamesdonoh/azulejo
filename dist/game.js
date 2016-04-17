(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tile = require('./tile');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(width, height) {
        _classCallCheck(this, Game);

        this.width = width;
        this.height = height;

        this.tiles = this.generateTiles();

        this.playArea = this.createPlayArea();

        console.log('Game created (width is %s, height is %s)', this.width, this.height);
    }

    _createClass(Game, [{
        key: 'start',
        value: function start() {
            console.log('Game started');
        }
    }, {
        key: 'generateTiles',
        value: function generateTiles() {
            var tiles = [];

            for (var i = 0; i < this.numPositions; i++) {
                var tile = new _tile.Tile();
                tiles.push(tile);
            }

            return tiles;
        }
    }, {
        key: 'tileAt',
        value: function tileAt(x, y) {
            if (x < 0 || x >= this.playArea.length) return null;

            var col = this.playArea[x];

            if (y < 0 || y >= col.length) return null;

            return col[y];
        }
    }, {
        key: 'canPlaceTile',
        value: function canPlaceTile(tile, x, y) {
            var tileAtTarget = this.tileAt(x, y);
            if (tileAtTarget && tileAtTarget !== tile) return false;

            var topNeighbour = this.tileAt(x, y - 1),
                rightNeighbour = this.tileAt(x + 1, y),
                bottomNeighbour = this.tileAt(x, y + 1),
                leftNeighbour = this.tileAt(x - 1, y);

            var canPlace = (!topNeighbour || topNeighbour === tile || topNeighbour.bottom === tile.top) && (!rightNeighbour || rightNeighbour === tile || rightNeighbour.left === tile.right) && (!bottomNeighbour || bottomNeighbour === tile || bottomNeighbour.top === tile.bottom) && (!leftNeighbour || leftNeighbour === tile || leftNeighbour.right === tile.left);

            //console.log(`[${x},${y}] = ${canPlace}, topNeighbour = ${topNeighbour}, rightNeighbour = ${rightNeighbour}, bottomNeighbour = ${bottomNeighbour}, leftNeighbour = ${leftNeighbour}`)

            return canPlace;
        }
    }, {
        key: 'placeTile',
        value: function placeTile(tile, x, y) {
            this.playArea[x][y] = tile;

            if (tile.coords !== null) {
                this.playArea[tile.coords[0]][tile.coords[1]] = null;
            }

            tile.coords = [x, y];

            console.log(tile + ' played at position ' + x + ',' + y);
        }
    }, {
        key: 'createPlayArea',
        value: function createPlayArea() {
            var _this = this;

            var emptyArray = function emptyArray(size) {
                return Array.apply(null, new Array(size));
            };

            var playArea = emptyArray(this.width).map(function (row) {
                return emptyArray(_this.height);
            });

            return playArea;
        }
    }, {
        key: 'numPositions',
        get: function get() {
            return this.width * this.height;
        }
    }]);

    return Game;
}();

exports.Game = Game;

},{"./tile":3}],2:[function(require,module,exports){
'use strict';

var _game = require('./game');

var _ui = require('./ui');

var parentSelector = 'body',
    gridWidth = 3,
    gridHeight = 3;

var game = new _game.Game(gridWidth, gridHeight);
window.ui = new _ui.UI(window.document, parentSelector, game);

ui.setupGrids();
ui.startGame();

},{"./game":1,"./ui":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
    function Tile() {
        _classCallCheck(this, Tile);

        var edges = [];

        var randomInt = function randomInt(min, max) {
            return Math.floor(Math.random() * (max + 1)) + min;
        };

        for (var i = 0; i < 4; i++) {
            edges.push(randomInt(0, 3));
        }

        this.top = edges[0];
        this.right = edges[1];
        this.bottom = edges[2];
        this.left = edges[3];

        this.coords = null;
    }

    _createClass(Tile, [{
        key: "toString",
        value: function toString() {
            return "[Tile " + this.top + "," + this.bottom + "," + this.right + "," + this.left + "]";
        }
    }]);

    return Tile;
}();

exports.Tile = Tile;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COLOURS = [];
for (var i = 0; i < 4; i++) {
    COLOURS.push(randomColor());
}

var coinFlipIsHeads = function coinFlipIsHeads() {
    return Math.round(Math.random()) === 0;
};

var UI = function () {
    function UI(documentObj, parentSelector, game) {
        _classCallCheck(this, UI);

        this.documentObj = documentObj;
        this.parentSelector = parentSelector;
        this.game = game;
    }

    _createClass(UI, [{
        key: 'setupGrids',
        value: function setupGrids() {
            var startGrid = this.createGrid('grid--start', true),
                endGrid = this.createGrid('grid--end', false);

            var parentEl = this.parentEl;
            parentEl.appendChild(startGrid);
            parentEl.appendChild(endGrid);
        }
    }, {
        key: 'isAcceptable',
        value: function isAcceptable(tileElement, positionElement) {
            var tile = tileElement.data('tile'),
                coords = positionElement.data('coords');

            return this.game.canPlaceTile(tile, coords[0], coords[1]);
        }
    }, {
        key: 'placeTile',
        value: function placeTile(tileElement, positionElement) {
            positionElement.append(tileElement);

            tileElement.css({
                left: 0,
                top: 0
            });

            var tile = tileElement.data('tile'),
                coords = positionElement.data('coords');

            this.game.placeTile(tile, coords[0], coords[1]);
        }
    }, {
        key: 'enableDragging',
        value: function enableDragging(sourceSelector, targetSelector, acceptableTargetHoverClass) {
            $(sourceSelector).draggable({
                stack: sourceSelector,
                revert: true,
                revertDuration: 200
            });

            // Prevent $ from clobbering our 'this' reference
            var boundIsAcceptable = this.isAcceptable.bind(this),
                boundPlaceTile = this.placeTile.bind(this);

            $(targetSelector).droppable({
                hoverClass: acceptableTargetHoverClass,
                activeClass: 'grid__position--allowed',
                accept: function accept(tileDiv) {
                    return boundIsAcceptable(tileDiv, $(this));
                },
                drop: function drop(event, ui) {
                    boundPlaceTile(ui.draggable, $(this));
                }
            });
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.enableDragging('.tile', '.grid__position', 'grid__position--dropping');
            this.game.start();
        }
    }, {
        key: 'createDiv',
        value: function createDiv() {
            var classes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            var element = this.documentObj.createElement('div');

            if (typeof classes === 'string') {
                element.className = classes;
            } else if (Array.isArray(classes) && classes.length > 0) {
                element.className = classes.join(' ');
            }

            return element;
        }
    }, {
        key: 'createGrid',
        value: function createGrid(type, hasTiles) {
            var grid = this.createDiv(['grid', type]),
                tiles = this.game.tiles,
                x = 0,
                y = 0;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tile = _step.value;

                    var position = this.createDiv('grid__position');

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
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return grid;
        }
    }, {
        key: 'createDomTile',
        value: function createDomTile(tile) {
            var domTile = this.createDiv('tile');

            domTile.style['border-top-color'] = this.getColourFromScheme(tile.top);
            domTile.style['border-right-color'] = this.getColourFromScheme(tile.right);
            domTile.style['border-bottom-color'] = this.getColourFromScheme(tile.bottom);
            domTile.style['border-left-color'] = this.getColourFromScheme(tile.left);

            $(domTile).data('tile', tile);

            return domTile;
        }
    }, {
        key: 'getColourFromScheme',
        value: function getColourFromScheme(code) {
            return COLOURS[code];
        }
    }, {
        key: 'parentEl',
        get: function get() {
            return this.documentObj.querySelector(this.parentSelector);
        }
    }]);

    return UI;
}();

exports.UI = UI;

},{}]},{},[2]);
