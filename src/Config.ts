import { PVector } from "./script/PVector";

export let settings = {
    texture: {
        type: 'string',
        default: 'star',
        enum: ['circular', 'star']
    },
    rotation: {
        type: 'number',
        default: 1
    },
    emitEveryTime: {
        type: 'integer',
        default: 1,
        minimum: 1
    },
    rateOfAging: {
        type: 'number',
        default: 0.02,
        maximum: 1
    },
    maxSize: {
        type: 'number',
        default: 10,
        minimum: 1
    },
    opacity: {
        type: 'number',
        default: 0.6,
        maximum: 1
    },
    clickCountMultiple: {
        type: 'integer',
        default: 3,
        minimum: 1
    },
    clickSizeMultiple: {
        type: 'number',
        default: 2,
        minimum: 1
    },
    monochrome: {
        type: 'boolean',
        "default": false
    },
    maxInitialVelocity: {
        type: 'object',
        properties: {
            x: {
                type: 'number',
                default: 5,
                minimum: 0
            },
            y: {
                type: 'number',
                default: 5,
                minimum: 0
            }
        }
    },
    wind: {
        type: 'object',
        properties: {
            x: {
                type: 'number',
                default: 0
            },
            y: {
                type: 'number',
                default: 0
            }
        }
    }
}

export class Config {
    texture: string;
    rotation: number;
    emitEveryTime: number;
    rateOfAging: number;
    maxSize: number;
    opacity: number;
    clickCountMultiple: number;
    clickSizeMultiple: number;
    monochrome: boolean;
    maxInitialVelocity: PVector = new PVector(0, 0);
    wind: PVector = new PVector(0, 0);

    setData(config: any) {
        this.texture = config.get('particle-fly.texture');
        this.rotation = config.get('particle-fly.rotation');
        this.emitEveryTime = config.get('particle-fly.emitEveryTime');
        this.rateOfAging = config.get('particle-fly.rateOfAging');
        this.opacity = config.get('particle-fly.opacity');
        this.maxSize = config.get('particle-fly.maxSize');
        this.clickCountMultiple = config.get('particle-fly.clickCountMultiple');
        this.clickSizeMultiple = config.get('particle-fly.clickSizeMultiple');
        this.monochrome = config.get('particle-fly.monochrome');
        this.maxInitialVelocity.x = config.get('particle-fly.maxInitialVelocity.x');
        this.maxInitialVelocity.y = config.get('particle-fly.maxInitialVelocity.y');
        this.wind.x = config.get('particle-fly.wind.x');
        this.wind.y = config.get('particle-fly.wind.y');
    }
}
