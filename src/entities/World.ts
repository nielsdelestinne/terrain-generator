import Tile from "./Tile";
import {Drawable} from "../Drawable";
import MainlandGenerator from "./world-generators/MainlandGenerator";
import {WorldGenerator} from "./world-generators/WorldGenerator";
import IslandsGenerator from "./world-generators/IslandsGenerator";

export default class World implements Drawable {

    private worldGenerator: WorldGenerator;
    private tiles: Tile[][] = [];
    private width: number;
    private height: number;
    private canvasId;

    private static readonly BACKGROUND_COLOUR: string = 'rgba(0, 0, 0, 1.0)';

    constructor(width: number, height: number, canvasId: string) {
        this.width = width;
        this.height = height;
        this.canvasId = canvasId;
        this.addClickListener();
        this.worldGenerator = new MainlandGenerator(this);
        // this.worldGenerator = new IslandsGenerator(this);
        this.tiles = this.worldGenerator.generate();
    }

    getAmountOfHorizontalTiles(): number {
        return this.width / Tile.TILE_DEFAULT_SIZE;
    }

    getAmountOfVerticalTiles(): number {
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
                this.tiles[xAxis][yAxis].setColour(this.getNeighboursWithLandOf(this.tiles[xAxis][yAxis], this.tiles).length);
                this.tiles[xAxis][yAxis].draw(context);
            }
        }
    }

    getNeighboursWithLandOf(tile: Tile, tiles: Tile[][]): Tile[] {
        return this.getNeighboursOf(tile, tiles).filter((nb) => nb.isOccupied());
    }

    getNeighboursOf(tile: Tile, tiles: Tile[][]): Tile[] {
        const neighbouringTiles = [];
        neighbouringTiles.push(
            this.getTileFromTiles(tile.getLeftNeighbour(), tiles),
            this.getTileFromTiles(tile.getUpperLeftNeighbour(), tiles),
            this.getTileFromTiles(tile.getBottomLeftNeighbour(), tiles),
            this.getTileFromTiles(tile.getRightNeighbour(), tiles),
            this.getTileFromTiles(tile.getUpperRightNeighbour(), tiles),
            this.getTileFromTiles(tile.getBottomRightNeighbour(), tiles),
            this.getTileFromTiles(tile.getUpperNeighbour(), tiles),
            this.getTileFromTiles(tile.getBottomNeighbour(), tiles)
        );
        return neighbouringTiles
            .filter((neighbour) => neighbour !== null);
    }

    private getTileFromTiles(coordinates: any, tiles: Tile[][]): Tile {
        if(this.hasValidXBounds(coordinates.x) && this.hasValidYbounds(coordinates.y)){
            return tiles[coordinates.x][coordinates.y];
        } return null;
    }

    private hasValidXBounds(x: number): boolean {
        return x > 0
            && x < this.getAmountOfHorizontalTiles() - 1;
    }

    private hasValidYbounds(y: number): boolean {
        return y > 0
            && y < this.getAmountOfVerticalTiles() - 1;
    }

    static getRandomNumber(minInclusive: number, maxInclusive: number) {
        return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
    }

    private addClickListener() {
        document.getElementById(this.canvasId).addEventListener('click',(evt) =>{
            const xTopLeft = Math.floor(evt.clientX / Tile.TILE_DEFAULT_SIZE);
            const yTopLeft = Math.floor(evt.clientY / Tile.TILE_DEFAULT_SIZE);
            alert(xTopLeft + ',' + yTopLeft);
        },false);
    }
}