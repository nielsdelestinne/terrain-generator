import Tile from "../Tile";
import World from "../World";

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
        return this.tiles;
    }

    abstract generateLand();

    private generateWaterTilesForEntireWorld(): void {
        for (let xAxis = 0; xAxis < this.world.getAmountOfHorizontalTiles(); xAxis++) {
            this.tiles[xAxis] = [];
            for (let yAxis = 0; yAxis < this.world.getAmountOfVerticalTiles(); yAxis++) {
                this.createWaterTile(xAxis, yAxis);
            }
        }
    }

    private createWaterTile(x: number, y: number): void {
        this.tiles[x][y] = new Tile(x, y, "WATER", false);
    }

    private addInitialLandTiles(): void {
        for(let amountOfLandTiles = 0; amountOfLandTiles <  this.initialAmountOfLandTiles; amountOfLandTiles++) {
            let x = World.getRandomNumber(0, this.world.getAmountOfHorizontalTiles()-1);
            let y = World.getRandomNumber(0, this.world.getAmountOfVerticalTiles() - 1);
            this.tiles[x][y] = new Tile(x, y, "LAND", true);
        }
    }

}