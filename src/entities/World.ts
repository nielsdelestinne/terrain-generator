import Tile from "./Tile";
import {Drawable} from "../Drawable";

export default class World implements Drawable {

    private tiles: Tile[][] = [];
    private width: number;
    private height: number;
    private canvasId;

    private static readonly BACKGROUND_COLOUR: string = 'rgba(0, 0, 0, 1.0)';

    private static readonly INITIAL_AMOUNT_OF_LAND_TILES = 1000;

    constructor(width: number, height: number, canvasId: string) {
        this.width = width;
        this.height = height;
        this.canvasId = canvasId;
        this.addClickListener();
        this.generateWorldContent();
    }

    private getAmountOfHorizontalTiles(): number {
        return this.width / Tile.TILE_DEFAULT_SIZE;
    }

    private getAmountOfVerticalTiles(): number {
        return this.height / Tile.TILE_DEFAULT_SIZE;
    }

    public draw(context: any): void {
        this.setBackgroundColor(context);
        this.drawTiles(context);
    }

    private setBackgroundColor(context: any): void {
        context.fillStyle = World.BACKGROUND_COLOUR;
        context.fillRect(0, 0, this.width, this.height);
    }

    private drawTiles(context: any): void {
        for (let xAxis = 0; xAxis < this.getAmountOfHorizontalTiles(); xAxis++) {
            for (let yAxis = 0; yAxis < this.getAmountOfVerticalTiles(); yAxis++) {
                this.tiles[xAxis][yAxis].setColour(this.getNeighboursWithLandOf(this.tiles[xAxis][yAxis]).length);
                this.tiles[xAxis][yAxis].draw(context);
            }
        }
    }

    private generateWorldContent() {
        this.generateWaterTilesForEntireWorld();
        this.addInitialLandTiles();
        this.generateLand();
    }

    private generateWaterTilesForEntireWorld(): void {
        for (let xAxis = 0; xAxis < this.getAmountOfHorizontalTiles(); xAxis++) {
            this.tiles[xAxis] = [];
            for (let yAxis = 0; yAxis < this.getAmountOfVerticalTiles(); yAxis++) {
                this.createWaterTile(xAxis, yAxis);
            }
        }
    }

    private createWaterTile(x: number, y: number): void {
        this.tiles[x][y] = new Tile(x, y, "WATER", false);
    }

    private addInitialLandTiles(): void {
        for(let amountOfLandTiles = 0; amountOfLandTiles <  World.INITIAL_AMOUNT_OF_LAND_TILES; amountOfLandTiles++) {
            let x = World.getRandomNumber(0, this.getAmountOfHorizontalTiles()-1);
            let y = World.getRandomNumber(0, this.getAmountOfVerticalTiles() - 1);
            this.tiles[x][y] = new Tile(x, y, "LAND", true);
        }
    }

    private generateLand() {
        for (let xAxis = 0; xAxis < this.getAmountOfHorizontalTiles(); xAxis++) {
            for (let yAxis = 0; yAxis < this.getAmountOfVerticalTiles(); yAxis++) {
                let neighboursWithLand = this.getNeighboursWithLandOf(this.tiles[xAxis][yAxis]);
                if ((neighboursWithLand.length * neighboursWithLand.length * World.getRandomNumber(1, 10)) > 25) {
                    this.tiles[xAxis][yAxis] = new Tile(xAxis, yAxis, "LAND", true);
                }
            }
        }
    }

    private getNeighboursWithLandOf(tile: Tile): Tile[] {
        return this.getNeighboursOf(tile).filter((nb) => nb.isOccupied());
    }

    private getNeighboursOf(tile: Tile): Tile[] {
        const neighbouringTiles = [];
        neighbouringTiles.push(
            this.getLeftNeighbour(tile),
            this.getUpperLeftNeighbour(tile),
            this.getBottomLeftNeighbour(tile),
            this.getRightNeighbour(tile),
            this.getUpperRightNeighbour(tile),
            this.getBottomRightNeighbour(tile),
            this.getUpperNeighbour(tile),
            this.getBottomNeighbour(tile)
        );
        return neighbouringTiles
            .filter((neighbour) => neighbour !== null);
    }

    private hasValidXBounds(tile: Tile): boolean {
        return tile.getX() > 0
            && tile.getX() < this.getAmountOfHorizontalTiles() - 1;
    }

    private hasValidYbounds(tile: Tile): boolean {
        return tile.getY() > 0
            && tile.getY() < this.getAmountOfVerticalTiles() - 1;
    }

    private getLeftNeighbour(tile: Tile): Tile {
        if (this.hasValidXBounds(tile))
            return this.tiles[tile.getX() - 1][tile.getY()];
        return null;
    }

    private getUpperLeftNeighbour(tile: Tile): Tile {
        if (this.hasValidXBounds(tile) && this.hasValidYbounds(tile))
            return this.tiles[tile.getX() - 1][tile.getY() - 1];
        return null;
    }

    private getBottomLeftNeighbour(tile: Tile): Tile {
        if (this.hasValidXBounds(tile) && this.hasValidYbounds(tile))
            return this.tiles[tile.getX() - 1][tile.getY() + 1];
        return null;
    }

    private getRightNeighbour(tile: Tile): Tile {
        if (this.hasValidXBounds(tile))
            return this.tiles[tile.getX() + 1][tile.getY()];
        return null;
    }

    private getUpperRightNeighbour(tile: Tile): Tile {
        if (this.hasValidXBounds(tile) && this.hasValidYbounds(tile))
            return this.tiles[tile.getX() + 1][tile.getY() - 1];
        return null;
    }

    private getBottomRightNeighbour(tile: Tile): Tile {
        if (this.hasValidXBounds(tile) && this.hasValidYbounds(tile))
            return this.tiles[tile.getX() + 1][tile.getY() + 1];
        return null;
    }

    private getBottomNeighbour(tile: Tile): Tile {
        if (this.hasValidYbounds(tile))
            return this.tiles[tile.getX()][tile.getY() + 1];
        return null;
    }

    private getUpperNeighbour(tile: Tile): Tile {
        if (this.hasValidYbounds(tile))
            return this.tiles[tile.getX()][tile.getY() - 1];
        return null;
    }

    static getRandomNumber(minInclusive: number, maxInclusive: number) {
        return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
    }

    private addClickListener() {
        document.getElementById(this.canvasId).addEventListener('click',(evt) =>{
            const xTopLeft = Math.floor(evt.clientX / Tile.TILE_DEFAULT_SIZE);
            const yTopLeft = Math.floor(evt.clientY / Tile.TILE_DEFAULT_SIZE);
            this.getNeighboursOf(this.tiles[xTopLeft][yTopLeft]).filter((nb) => console.log(nb));
            let result = this.getNeighboursOf(this.tiles[xTopLeft][yTopLeft]).filter((nb) => nb.isOccupied());
            console.log(result.length);
            alert(xTopLeft + ',' + yTopLeft);
        },false);
    }
}