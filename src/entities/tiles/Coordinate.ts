export default class Coordinate {

    private constructor(private x: number, private y: number){}

    public static of(x: number, y: number) {
        return new Coordinate(x, y);
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

}