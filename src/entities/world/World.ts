import Tile from "../tiles/Tile";
import {Drawable} from "../../Drawable";
import MainlandGenerator from "./world-generators/MainlandGenerator";
import {WorldGenerator} from "./world-generators/WorldGenerator";
import IslandsGenerator from "./world-generators/IslandsGenerator";
import Coordinate from "../tiles/Coordinate";
import {TileType} from "../tiles/TileType";
import MouseListener from "../../listeners/MouseListener";
import {Controllable} from "../../Controllable";

export default class World implements Drawable, Controllable {

    private worldGenerator: WorldGenerator;
    private tiles: Tile[][] = [];
    private width: number;
    private height: number;
    private canvasId;
    private context;

    private static readonly BACKGROUND_COLOUR: string = 'rgba(0, 0, 0, 1.0)';

    constructor(width: number, height: number, canvasId: string, context: any) {
        this.width = width;
        this.height = height;
        this.canvasId = canvasId;
        this.context = context;
        this.registerListeners();
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
        return this.getNeighboursOf(tile, tiles).filter((nb) => nb.isOfType(TileType.LAND));
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

    private getTileFromTiles(coordinate: Coordinate, tiles: Tile[][]): Tile {
        if(this.hasValidXBounds(coordinate.getX()) && this.hasValidYbounds(coordinate.getY())){
            return tiles[coordinate.getX()][coordinate.getY()];
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

    registerListeners(): void {
        MouseListener.onClick(this.canvasId, this.onClickCallback());
    }

    private onClickCallback() {
        return (event) =>{
            const xTopLeft = Math.floor(event.clientX / Tile.TILE_DEFAULT_SIZE);
            const yTopLeft = Math.floor(event.clientY / Tile.TILE_DEFAULT_SIZE);
            this.tiles[xTopLeft][yTopLeft].setType(TileType.LAND);
            this.tiles[xTopLeft][yTopLeft].draw(this.context);
        };
    }
}