import {Drawable} from "../Drawable";

export default class Tile implements Drawable {

    public static readonly TILE_DEFAULT_SIZE = 10;
    private colour: string = 'rgba(127,191,63,1.0)';
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

    constructor(private xTopLeft: number,
                private yTopLeft: number,
                private type: string,
                private isTileOccupied: boolean) {

    }

    public isOccupied(): boolean {
        return this.isTileOccupied;
    }

    public setAsOccupied(): void {
        this.isTileOccupied = true;
    }

    public getX() {
        return this.xTopLeft;
    }

    public getY() {
        return this.yTopLeft;
    }

    public getType(): string {
        return this.type;
    }

    public setColour(amountOfNeighboursWithLand: number): void {

        if(this.type === "LAND") {
            this.colour = this.landColours[amountOfNeighboursWithLand];
        } else {
            this.colour = this.waterColours[amountOfNeighboursWithLand];
        }
    }

    public draw(context: any) {
        context.fillStyle = this.colour;
        context.strokeStyle = 'rgba(0,0,0,1.0)';
        context.fillRect(this.xTopLeft * Tile.TILE_DEFAULT_SIZE, this.yTopLeft * Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE);
        context.strokeRect(this.xTopLeft * Tile.TILE_DEFAULT_SIZE, this.yTopLeft * Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE);
    }
}