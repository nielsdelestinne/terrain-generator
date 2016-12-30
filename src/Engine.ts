import World from "./entities/world/World";
import Tile from "./entities/tiles/Tile";

export default class Engine {

    private canvas: any;
    private context: any;
    private world: World;

    constructor(private canvasId: string,
                private width: number = window.innerWidth,
                private height: number = window.innerHeight) {
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");
        this.setUrlProperties();
        this.world = new World(width, height, canvasId, this.context);
        this.world.draw(this.context);
        this.loop();
    }

    private loop() {
        setInterval(() => {
            this.world.draw(this.context);
        },
        2000);
    }

    private createCanvas(): HTMLElement {
        const canvasElement = document.createElement("canvas");
        canvasElement.setAttribute("id", this.canvasId);
        canvasElement.setAttribute("width", `${this.width}`);
        canvasElement.setAttribute("height", `${this.height}`);
        document.body.appendChild(canvasElement);
        return canvasElement;
    }

    private setUrlProperties() {
        World.SEED = this.getUrlParameterByName("seed") !== null ? Number(this.getUrlParameterByName("seed")) : World.getRandomNumber(0, 15000);
        World.WORLD_GENERATOR_TYPE = this.getUrlParameterByName("type");
        Tile.TILE_DEFAULT_SIZE = this.getUrlParameterByName("tile") !== null ? Number(this.getUrlParameterByName("tile")) : 10;
    }

    private getUrlParameterByName(name) {
        const url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}

/*
 * We create an instance of Engine,
 * and by doing so, we render the canvas (and start the game-loop).
 * */
new Engine("theCanvas");