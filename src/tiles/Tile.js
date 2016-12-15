"use strict";
var Tile = (function () {
    function Tile(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
    }
    Tile.prototype.isOccupied = function () {
        return this.isTileOccupied;
    };
    Tile.prototype.setAsOccupied = function () {
        this.isTileOccupied = true;
    };
    Tile.prototype.draw = function (context) {
        context.fillStyle = this.type === "LAND" ? "#bca05e" : "#32b2b5";
        context.fillRect(this.x, this.y, this.size, this.size);
        context.strokeStyle = "#000";
        context.strokeRect(this.x, this.y, this.size, this.size);
        this.setAsOccupied();
    };
    return Tile;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tile;
//# sourceMappingURL=Tile.js.map