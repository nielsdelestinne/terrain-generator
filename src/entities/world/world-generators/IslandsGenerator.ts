import {WorldGenerator} from "./WorldGenerator";
import World from "../World";
import Tile from "../../tiles/Tile";
import Coordinate from "../../tiles/Coordinate";
import {TileType} from "../../tiles/TileType";

export default class IslandsGenerator extends WorldGenerator {

    private static readonly INITIAL_AMOUNT_OF_LAND_TILES: number = 1000;

    constructor(world: World) {
        super(world, IslandsGenerator.INITIAL_AMOUNT_OF_LAND_TILES);
    }

    generateLand(): void {
        for (let xAxis = 0; xAxis < this.getWorld().getAmountOfHorizontalTiles(); xAxis++) {
            for (let yAxis = 0; yAxis < this.getWorld().getAmountOfVerticalTiles(); yAxis++) {
                let neighboursWithLand = this.getWorld().getNeighboursWithLandOf(this.getTiles()[xAxis][yAxis], this.getTiles());
                if ((neighboursWithLand.length * neighboursWithLand.length * World.getRandomNumber(1, 10)) > 25) {
                    this.getTiles()[xAxis][yAxis] = new Tile(Coordinate.of(xAxis, yAxis), TileType.LAND);
                }
            }
        }
    }

}