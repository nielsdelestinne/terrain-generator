import Tile from "../../tiles/Tile";
import World from "../World";
import Coordinate from "../../tiles/Coordinate";
import {TileType} from "../../tiles/TileType";
export abstract class WorldGenerator {

    private tiles: Tile[][] = [];

    constructor(private world: World,
        private initialAmountOfLandTiles: number) {}

    getTiles(): Tile[][] {
        return this.tiles;
    }

    getWorld(): World {
        return this.world;
    }

    generate(): Tile[][] {
        this.generateWaterTilesForEntireWorld();
        this.addInitialLandTiles();
        this.generateLand();
        return this.getTiles();
    }

    abstract generateLand();

    private generateWaterTilesForEntireWorld(): void {
        for (let xAxis = 0; xAxis < this.world.getAmountOfHorizontalTiles(); xAxis++) {
            this.getTiles()[xAxis] = [];
            for (let yAxis = 0; yAxis < this.world.getAmountOfVerticalTiles(); yAxis++) {
                this.createWaterTile(xAxis, yAxis);
            }
        }
    }

    private createWaterTile(x: number, y: number): void {
        this.getTiles()[x][y] = new Tile(Coordinate.of(x,y), TileType.WATER);
    }

    private addInitialLandTiles(): void {
        for(let amountOfLandTiles = 0; amountOfLandTiles <  this.initialAmountOfLandTiles; amountOfLandTiles++) {
            let x = World.getRandomNumber(0, this.world.getAmountOfHorizontalTiles()-1);
            let y = World.getRandomNumber(0, this.world.getAmountOfVerticalTiles() - 1);
            this.getTiles()[x][y] = new Tile(Coordinate.of(x, y), TileType.LAND);
        }
    }

}