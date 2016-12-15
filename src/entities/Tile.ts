import {Drawable} from "../Drawable";

export default class Tile implements Drawable {

    public static readonly TILE_DEFAULT_SIZE = 5;

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

    public draw(context: any) {
        context.fillStyle = this.type === "LAND" ? 'rgba(127,191,63,1.0)' : 'rgba(41,122,147,1.0)';
        context.strokeStyle = 'rgba(0,0,0,1.0)';
        context.fillRect(this.xTopLeft * Tile.TILE_DEFAULT_SIZE, this.yTopLeft * Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE);
        context.strokeRect(this.xTopLeft * Tile.TILE_DEFAULT_SIZE, this.yTopLeft * Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE);
    }
}