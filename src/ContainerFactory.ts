import * as PIXI from "pixi.js";
import { Colors } from "./script/Colors";
import { Config } from "./Config";

const point = (x: number, y: number) => new PIXI.Point(x, y);

const normalStarPoints: PIXI.Point[] = [];
for (var i = 0; i < 5; i++) {
    const angle = (72 * i) / 180 * Math.PI;
    const angle2 = (36 + 72 * i) / 180 * Math.PI;
    normalStarPoints.push(point(Math.cos(angle), - Math.sin(angle)));
    normalStarPoints.push(point(Math.cos(angle2) * 0.5, - Math.sin(angle2) * 0.5));
}

export class ContainerFactory {
    config: Config;
    multiple = false;

    constructor(config: Config) {
        this.config = config;
    }

    randomSize() {
        return (Math.random() * this.config.whatToDraw.range() + this.config.whatToDraw.minSize)
            * (this.multiple ? this.config.clickSizeMultiple : 1);
    }

    circular() {
        let circle = new PIXI.Graphics();
        circle.beginFill(this.config.whatToDraw.monochrome ? Colors.white : Colors.random());
        circle.drawCircle(0, 0, this.randomSize());
        circle.endFill();
        return circle;
    }

    star() {
        let star = new PIXI.Graphics();
        star.beginFill(this.config.whatToDraw.monochrome ? Colors.white : Colors.random());
        let points: PIXI.Point[] = [];
        let size = this.randomSize();
        for (let p of normalStarPoints) {
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    }

    starSakura() {
        let star = new PIXI.Graphics();
        star.beginFill(this.config.whatToDraw.monochrome ? Colors.white : Colors.pink);
        let points: PIXI.Point[] = [];
        let size = this.randomSize();
        for (let p of normalStarPoints) {
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    }

    image() {
        let image = new PIXI.Sprite();
        let size = this.randomSize();
        console.log(this.config.whatToDraw.image);
        image.texture = PIXI.loader.resources[this.config.whatToDraw.image].texture;
        image.width = size*2;
        image.height = size*2;
        image.anchor.x = 0.5;
        image.anchor.y = 0.5;
        return image;
    }
}
