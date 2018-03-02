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

const cos30 = Math.cos(Math.PI / 6);
const sin30 = Math.sin(Math.PI / 6);

export class ContainerFactory {
    config: Config;
    multiple = false;

    constructor(config: Config) {
        this.config = config;
    }

    private randomSize() {
        return (Math.random() * this.config.whatToDraw.range() + this.config.whatToDraw.minSize)
            * (this.multiple ? this.config.clickSizeMultiple : 1);
    }

    private randomFromArray(arr: any[]) {
        return arr[Math.round(Math.random() * (arr.length - 1))];
    }

    private color() {
        return this.config.whatToDraw.randomColor ?
            Colors.random() : Colors.toHex(this.config.whatToDraw.color);
    }

    create() {
        switch (this.config.whatToDraw.texture) {
            case "circular": return this.circular();
            case "star": return this.star();
            case "cross": return this.cross();
            case "hexagram": return this.hexagram();
            case "- custImage -": return this.image();
        }
    }

    circular() {
        let circle = new PIXI.Graphics();
        circle.beginFill(this.color());
        circle.drawCircle(0, 0, this.randomSize());
        circle.endFill();
        return circle;
    }

    star() {
        let star = new PIXI.Graphics();
        star.beginFill(this.color());
        let points: PIXI.Point[] = [];
        let size = this.randomSize();
        for (let p of normalStarPoints) {
            points.push(point(p.x * size, p.y * size));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    }

    cross() {
        let cross = new PIXI.Graphics();
        let size = this.randomSize();
        cross.lineStyle(size / 10, this.color());
        cross.moveTo(0, size);
        cross.lineTo(0, -size);
        cross.moveTo(size, 0);
        cross.lineTo(-size, 0);
        return cross;
    }

    hexagram() {
        let cross = new PIXI.Graphics();
        let size = this.randomSize();
        let cos = cos30 * size;
        let sin = sin30 * size;
        cross.lineStyle(size / 10, this.color());
        cross.moveTo(0, size);
        cross.lineTo(cos, -sin);
        cross.lineTo(-cos, -sin);
        cross.lineTo(0, size);
        cross.moveTo(0, -size);
        cross.lineTo(-cos, sin);
        cross.lineTo(cos, sin);
        cross.lineTo(0, -size);
        return cross;
    }

    image() {
        let image = new PIXI.Sprite();
        let size = this.randomSize();
        let urls = this.config.whatToDraw.image.split(';');
        let url = this.randomFromArray(urls);
        image.texture = PIXI.loader.resources[url].texture;
        image.width = size * 2;
        image.height = size * 2;
        image.anchor.x = 0.5;
        image.anchor.y = 0.5;
        return image;
    }
}
