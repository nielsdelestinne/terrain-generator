import Tile from './tiles/Tile';

export default class Engine {

    private canvas: any;
    private context: any;

    constructor(private canvasId: string,
                private width: number = window.innerWidth,
                private height: number = window.innerHeight) {
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");
        this.setBackgroundColor("#000");
        this.generateWater();
        this.generateLand();
    }

    private createCanvas(): HTMLElement {
        const canvasElement = document.createElement("canvas");
        canvasElement.setAttribute("id", this.canvasId);
        canvasElement.setAttribute("width", `${this.width}`);
        canvasElement.setAttribute("height", `${this.height}`);
        document.body.appendChild(canvasElement);
        return canvasElement;
    }


    private setBackgroundColor(hexColor: string) {
        this.context.fillStyle = hexColor;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    private generateWater() {
        for (let xAxis = 0; xAxis < this.width / Tile.TILE_DEFAULT_SIZE; xAxis++) {
            for (let yAxis = 0; yAxis < this.height / Tile.TILE_DEFAULT_SIZE; yAxis++) {
                this.createTile(xAxis, yAxis);
            }
        }
    }

    private createTile(x: number, y: number) {
        let tile = new Tile(x * Tile.TILE_DEFAULT_SIZE, y * Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE, "LAND");
        tile.draw(this.context);
    }

    private generateLand() {
        let numberOfStartingPoints =  this.random(150, 175);
            for (let startPoint = 1; startPoint <= numberOfStartingPoints; startPoint++) {
                let startPointX = this.random(1, this.width / Tile.TILE_DEFAULT_SIZE);
                let startPointY = this.random(1, this.height / Tile.TILE_DEFAULT_SIZE);
                let expansionPercentage = this.random(95, 100);
                this.expand(startPointX, startPointY, expansionPercentage, "LAND", "START");
            }
    }

    private expand(startPointX: number, startPointY: number, expansionPercentage: number, type: string, expandTo: string) {
        if (startPointX < 0 || startPointX > this.width / Tile.TILE_DEFAULT_SIZE
            || startPointY < 0 || startPointY > this.height / Tile.TILE_DEFAULT_SIZE) {
            return;
        }
        if (expansionPercentage <= 50) {
            return;
        }

        let tile = new Tile(startPointX * Tile.TILE_DEFAULT_SIZE, startPointY * Tile.TILE_DEFAULT_SIZE, Tile.TILE_DEFAULT_SIZE, type);
        tile.draw(this.context);

        if(expandTo === "RIGHT") {
            this.expand(startPointX + 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "RIGHT");
            this.expand(startPointX, startPointY - 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "RIGHT");
            this.expand(startPointX, startPointY + 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "RIGHT");
        }

        if(expandTo === "LEFT") {
            this.expand(startPointX - 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "LEFT");
            this.expand(startPointX, startPointY - 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "LEFT");
            this.expand(startPointX, startPointY + 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "LEFT");
        }

        if(expandTo === "TOP") {
            this.expand(startPointX + 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "TOP");
            this.expand(startPointX - 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "TOP");
            this.expand(startPointX, startPointY - 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "TOP");
        }

        if(expandTo === "BOTTOM") {
            this.expand(startPointX + 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "BOTTOM");
            this.expand(startPointX - 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "BOTTOM");
            this.expand(startPointX, startPointY + 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "BOTTOM");
        }

        if(expandTo === "START") {
            this.expand(startPointX + 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "RIGHT");
            this.expand(startPointX - 1, startPointY, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "LEFT");
            this.expand(startPointX, startPointY - 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "TOP");
            this.expand(startPointX, startPointY + 1, expansionPercentage - this.random(this.random(1, 5), this.random(6, 25)), "LAND", "BOTTOM");
        }

    }

    random(minInclusive: number, maxInclusive: number) {
        return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
    }
}

/*
 * We create an instance of Engine,
 * and by doing so, we render the canvas.
 * */
new Engine("theCanvas");