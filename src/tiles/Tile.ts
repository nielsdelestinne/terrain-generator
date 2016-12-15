export default class Tile {

    public static readonly TILE_DEFAULT_SIZE = 15;

    private isTileOccupied: boolean;

    constructor(private x: number,
                private y: number,
                private size: number,
                private type: string) {}

    public isOccupied() {
        return this.isTileOccupied;
    }

    public setAsOccupied() {
        this.isTileOccupied = true;
    }

    public draw(context: any) {
        context.fillStyle = this.type === "LAND" ? 'rgba(191,127,63,0.1)' : 'rgba(0,0,0,1)';
        context.fillRect(this.x, this.y, this.size, this.size);
        context.strokeStyle = 'rgba(0,0,0,0.3)';
        context.strokeRect(this.x, this.y, this.size, this.size);
        this.setAsOccupied();
    }
}