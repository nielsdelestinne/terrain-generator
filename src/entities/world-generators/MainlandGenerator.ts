import {WorldGenerator} from "./WorldGenerator";
import Tile from "../Tile";
import World from "../World";

export default class MainlandGenerator extends WorldGenerator {

    private static readonly INITIAL_AMOUNT_OF_LAND_TILES: number = 100;

    constructor(world: World) {
        super(world, MainlandGenerator.INITIAL_AMOUNT_OF_LAND_TILES);
    }

    generateLand(): void {
        for (let xAxis = 0; xAxis < this.getWorld().getAmountOfHorizontalTiles(); xAxis++) {
            for (let yAxis = 0; yAxis < this.getWorld().getAmountOfVerticalTiles(); yAxis++) {
                if(this.getTiles()[xAxis][yAxis].isOccupied() && World.getRandomNumber(1, 2) === 2) {
                    let neighbours = this.getWorld().getNeighboursOf(this.getTiles()[xAxis][yAxis], this.getTiles());
                    neighbours.forEach((tile) => this.getTiles()[tile.getX()][tile.getY()] = new Tile(tile.getX(), tile.getY(), "LAND", true))
                }
            }
        }
    }

}