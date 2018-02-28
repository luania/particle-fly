import { PVector } from "./PVector";
import * as PIXI from "pixi.js";

export class Particle {
    position: PVector = new PVector(0, 0);
    velocity: PVector = new PVector(0, 0);
    acceleration: PVector = new PVector(0, 0);
    lifeSpan: number = 1;
    mass: number = 1;
    rateOfAging = 0.05;
    container:PIXI.Container;
    opacity:number = 1;
    rotation:number = 1;

    constructor(container:PIXI.Container){
        this.container = container;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifeSpan -= this.rateOfAging;

        this.container.x = this.position.x;
        this.container.y = this.position.y;
        this.container.alpha = this.opacity * this.lifeSpan;
        this.container.rotation += Math.PI / 180 * this.rotation;
    }

    applyForce(force: PVector) {
        this.acceleration.add(PVector.div(force, this.mass));
    }

    isDead() {
        return this.lifeSpan <= 0;
    }
}
