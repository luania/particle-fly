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

    private randomSize() {
        return (Math.random() * this.config.whatToDraw.range() + this.config.whatToDraw.minSize)
            * (this.multiple ? this.config.clickSizeMultiple : 1);
    }

    private randomFromArray(arr:any[]) {
        return arr[Math.round(Math.random()*(arr.length-1))];
    }

    private color(c:number) {
        return this.config.whatToDraw.monochrome ? Colors.white : c;
    }

    create() {
        let container:PIXI.Container;
        switch (this.config.whatToDraw.texture) {
            case "circular":
                container = this.circular();
                break;
            case "star":
                container = this.star();
                break;
            case "starSakura":
                container = this.starSakura();
                break;
            case "cross":
                container = this.cross();
                break;
            case "- custImage -":
                container = this.image();
                break;
            default:
                break;
        }
        return container;
    }

    circular() {
        let circle = new PIXI.Graphics();
        circle.beginFill(this.color(Colors.random()));
        circle.drawCircle(0, 0, this.randomSize());
        circle.endFill();
        return circle;
    }

    star() {
        let star = new PIXI.Graphics();
        star.beginFill(this.color(Colors.random()));
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
        star.beginFill(this.color(Colors.pink));
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
        cross.beginFill(this.color(Colors.pink));
        cross.lineStyle(size/10, this.color(Colors.pink));
        cross.moveTo(0, size);
        cross.lineTo(0, -size);
        cross.moveTo(size, 0);
        cross.lineTo(-size, 0);
        cross.endFill();
        return cross;
    }

    image() {
        let image = new PIXI.Sprite();
        let size = this.randomSize();
        let urls = this.config.whatToDraw.image.split(';');
        let url = this.randomFromArray(urls);
        image.texture = PIXI.loader.resources[url].texture;
        image.width = size*2;
        image.height = size*2;
        image.anchor.x = 0.5;
        image.anchor.y = 0.5;
        return image;
    }
}
