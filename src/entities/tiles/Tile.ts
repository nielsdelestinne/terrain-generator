import {Drawable} from "../../Drawable";
import Coordinate from "./Coordinate";
import {Terrain} from "./Terrain";

export default class Tile implements Drawable {

    public static TILE_DEFAULT_SIZE = 15;

    private colour: string = 'rgba(127,191,63,1.0)';
    private structureColours: string[] = [
        "rgba(145, 65, 27, 1)",
        "rgba(145, 65, 27, 1)",
        "rgba(179, 76, 29, 1)",
        "rgba(179, 76, 29, 1)",
        "rgba(179, 76, 29, 1)",
        "rgba(179, 76, 29, 1)",
        "rgba(179, 76, 29, 1)",
        "rgba(179, 76, 29, 1)",
        "rgba(179, 76, 29, 1)"];
    private landColours: string[] = [
        "rgba(180, 178, 49, 1)",
        "rgba(180, 178, 49, 1)",
        "rgba(180, 178, 49, 1)",
        "rgba(136, 134, 37, 1)",
        "rgba(136, 134, 37, 1)",
        "rgba(136, 134, 37, 1)",
        "rgba(116, 115, 32, 1)",
        "rgba(116, 115, 32, 1)",
        "rgba(116, 115, 32, 1)"];
    private waterColours: string[] = [
        "rgba(39, 104, 144, 1)",
        "rgba(39, 104, 144, 1)",
        "rgba(39, 104, 144, 1)",
        "rgba(71, 153, 205, 1)",
        "rgba(71, 153, 205, 1)",
        "rgba(71, 153, 205, 1)",
        "rgba(143, 193, 224, 1)",
        "rgba(143, 193, 224, 1)",
        "rgba(143, 193, 224, 1)"];

    constructor(private coordinate: Coordinate,
                private type: Terrain) {}

    public getType(): Terrain {
        return this.type;
    }

    public setType(type: Terrain): void {
        this.type = type;
        if (this.type === Terrain.LAND) {
            this.colour = this.landColours[4];
        }
        if (this.type === Terrain.STRUCTURE) {
            this.colour = this.structureColours[4];
        }
        if (this.type === Terrain.WATER) {
            this.colour = this.waterColours[1];
        }
    }

    public isOfType(type: Terrain): boolean {
        return this.type === type;
    }

    public getCoordinate() {
        return this.coordinate;
    }

    public setColour(amountOfNeighboursWithLand: number): void {
        if (this.type === Terrain.LAND) {
            this.colour = this.landColours[amountOfNeighboursWithLand];
        }
        if (this.type === Terrain.STRUCTURE) {
            this.colour = this.structureColours[amountOfNeighboursWithLand];
        }
        if (this.type === Terrain.WATER) {
            this.colour = this.waterColours[amountOfNeighboursWithLand];
        }
    }

    public draw(context: any) {
        context.fillStyle = this.colour;
        context.strokeStyle = 'rgba(0,0,0,1.0)';
        context.fillRect(
            this.coordinate.getX() * Tile.TILE_DEFAULT_SIZE,
            this.coordinate.getY() * Tile.TILE_DEFAULT_SIZE,
            Tile.TILE_DEFAULT_SIZE,
            Tile.TILE_DEFAULT_SIZE);
        context.strokeRect(
            this.coordinate.getX() * Tile.TILE_DEFAULT_SIZE,
            this.coordinate.getY() * Tile.TILE_DEFAULT_SIZE,
            Tile.TILE_DEFAULT_SIZE,
            Tile.TILE_DEFAULT_SIZE);
    }

    getLeftNeighbour(): any {
        return Coordinate.of(this.coordinate.getX() - 1, this.coordinate.getY());
    }

    getUpperLeftNeighbour(): any {
        return Coordinate.of(this.coordinate.getX() - 1, this.coordinate.getY() - 1);
    }

    getBottomLeftNeighbour(): any {
        return Coordinate.of(this.coordinate.getX() - 1, this.coordinate.getY() + 1);
    }

    getRightNeighbour(): any {
        return Coordinate.of(this.coordinate.getX() + 1, this.coordinate.getY());
    }

    getUpperRightNeighbour(): any {
        return Coordinate.of(this.coordinate.getX() + 1, this.coordinate.getY() - 1);
    }

    getBottomRightNeighbour(): any {
        return Coordinate.of(this.coordinate.getX() + 1, this.coordinate.getY() + 1);
    }

    getBottomNeighbour(): any {
        return Coordinate.of(this.coordinate.getX(), this.coordinate.getY() + 1);
    }

    getUpperNeighbour(): any {
        return Coordinate.of(this.coordinate.getX(), this.coordinate.getY() - 1);
    }
}