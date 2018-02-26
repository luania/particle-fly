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
    maxAlpha:number;

    constructor(container:PIXI.Container, maxAlpha:number){
        this.container = container;
        this.maxAlpha = maxAlpha;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifeSpan -= this.rateOfAging;

        this.container.x = this.position.x;
        this.container.y = this.position.y;
        this.container.alpha = this.maxAlpha * this.lifeSpan;
    }

    applyForce(force: PVector) {
        this.acceleration.add(PVector.div(force, this.mass));
    }

    isDead() {
        return this.lifeSpan <= 0;
    }
}
