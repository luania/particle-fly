import * as PIXI from "pixi.js";

let randomColor = () => Math.round(Math.random() * 0xFFFFFF);

export class ContainerFactory {

    circular(maxSize:number) {
        let circle = new PIXI.Graphics();
        circle.beginFill(randomColor());
        circle.drawCircle(0, 0, Math.random() * maxSize);
        circle.endFill();
        return circle;
    }

    star(maxSize:number) {
        let star = new PIXI.Graphics();
        star.beginFill(randomColor());
        let points: PIXI.Point[] = [];
        let size = Math.random() * maxSize;
        for( var i = 0 ; i < 5 ; i ++){
            points.push(new PIXI.Point(Math.cos((18+72*i)/180*Math.PI)*size ,- Math.sin((18+72*i)/180*Math.PI)*size));
            points.push(new PIXI.Point(Math.cos((54+72*i)/180*Math.PI)*size*0.5 ,- Math.sin((54+72*i)/180*Math.PI)*size*0.5));
        }
        star.drawPolygon(points);
        star.endFill();
        return star;
    }
}
