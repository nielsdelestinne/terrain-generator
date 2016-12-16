"use strict";
var Tile_1 = require("./entities/tiles/Tile");
var Engine = (function () {
    function Engine(canvasId, width, height) {
        if (width === void 0) { width = window.innerWidth; }
        if (height === void 0) { height = window.innerHeight; }
        this.canvasId = canvasId;
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");
        this.setBackgroundColor("#000");
        this.createGrid();
    }
    Engine.prototype.createCanvas = function () {
        var canvasElement = document.createElement("canvas");
        canvasElement.setAttribute("id", this.canvasId);
        canvasElement.setAttribute("width", "" + this.width);
        canvasElement.setAttribute("height", "" + this.height);
        document.body.appendChild(canvasElement);
        return canvasElement;
    };
    Engine.prototype.setBackgroundColor = function (hexColor) {
        this.context.fillStyle = hexColor;
        this.context.fillRect(0, 0, this.width, this.height);
    };
    Engine.prototype.createGrid = function () {
        for (var xAxis = 0; xAxis < this.width / 50; xAxis++) {
            for (var yAxis = 0; yAxis < this.height / 50; yAxis++) {
                this.createTile(xAxis, yAxis, 50);
            }
        }
    };
    Engine.prototype.createTile = function (x, y, size) {
        var tile = new Tile_1.default(x * size, y * size, size, "LAND");
        var colours = ["#e2f442", "#32b2b5", "#bca05e", "#ffd30f"];
        var random = Math.round(Math.random() * 3) + 0;
        this.context.fillStyle = colours[random];
        this.context.fillRect(x * size, y * size, size, size);
        this.context.strokeStyle = "#000";
        this.context.strokeRect(x * size, y * size, size, size);
    };
    return Engine;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Engine;
//# sourceMappingURL=Engine.js.map