import * as PIXI from "pixi.js";
import { Colors } from "./script/Colors";

const point = (x: number, y: number) => new PIXI.Point(x, y);

const normalStarPoints: PIXI.Point[] = [];
for (var i = 0; i < 5; i++) {
    const angle = (72 * i) / 180 * Math.PI;
    const angle2 = (36 + 72*i) / 180 * Math.PI;
    normalStarPoints.push(point(Math.cos(angle), -Math.sin(angle)));
    normalStarPoints.push(point(Math.cos(angle2) * 0.5, - Math.sin(angle2) * 0.5));
}

export class ContainerFactory {
    maxSize = 1;
    monochrome = false;

    circular() {
        let circle = new PIXI.Graphics();
        circle.beginFill(this.monochrome?Colors.white:Colors.randomColor());
        circle.drawCircle(0, 0, Math.random() * this.maxSize);
        circle.endFill();
        return circle;
    }

    star() {
        let star = new PIXI.Graphics();
        star.beginFill(this.monochrome?Colors.white:Colors.randomColor());
        let points: PIXI.Point[] = [];
        let size = Math.random() * this.maxSize;
        for (let p of normalStarPoints) {
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    }

    starSakura() {
        let star = new PIXI.Graphics();
        star.beginFill(this.monochrome?Colors.white:Colors.pink);
        let points: PIXI.Point[] = [];
        let size = Math.random() * this.maxSize;
        for (let p of normalStarPoints) {
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    }
}
