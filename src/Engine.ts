import World from "./entities/world/World";

export default class Engine {

    private canvas: any;
    private context: any;
    private world: World;

    constructor(private canvasId: string,
                private width: number = window.innerWidth,
                private height: number = window.innerHeight) {
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");
        this.world = new World(width, height, canvasId, this.context);
        this.world.draw(this.context);
    }

    // methode voor gameloop: redraw all drawables

    private createCanvas(): HTMLElement {
        const canvasElement = document.createElement("canvas");
        canvasElement.setAttribute("id", this.canvasId);
        canvasElement.setAttribute("width", `${this.width}`);
        canvasElement.setAttribute("height", `${this.height}`);
        document.body.appendChild(canvasElement);
        return canvasElement;
    }
}

/*
 * We create an instance of Engine,
 * and by doing so, we render the canvas (and start the game-loop).
 * */
new Engine("theCanvas");