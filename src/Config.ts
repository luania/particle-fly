import { PVector } from "./script/PVector";

export let settings = {
    whatToDraw: {
        order: 1,
        type: 'object',
        properties: {
            texture: {
                order: 1,
                title: 'texture',
                type: 'string',
                default: 'star',
                enum: ['- custImage -', 'circular', 'star', 'starSakura']
            },
            monochrome: {
                order: 2,
                title: 'monochrome',
                type: 'boolean',
                default: false,
                description: 'effectless when texture is \'- custImage -\''
            },
            image: {
                order: 3,
                title: 'images',
                type: 'string',
                default: '',
                description: 'local or net image,cut with \';\',random for each particle,only effect when texture is \'- custImage -\''
            },
            opacity: {
                order: 4,
                title: 'opacity',
                type: 'number',
                default: 0.6,
                maximum: 1
            },
            minSize: {
                order: 5,
                title: 'minSize',
                type: 'number',
                default: 2,
                minimum: 1
            },
            maxSize: {
                order: 6,
                title: 'maxSize',
                type: 'number',
                default: 10,
                minimum: 2
            }
        }
    },
    rotation: {
        order: 2,
        type: 'number',
        default: 1
    },
    emitEveryTime: {
        order: 3,
        type: 'integer',
        default: 1,
        minimum: 1
    },
    rateOfAging: {
        order: 4,
        type: 'number',
        default: 0.02,
        maximum: 1
    },
    clickCountMultiple: {
        order: 5,
        type: 'integer',
        default: 3,
        minimum: 1
    },
    clickSizeMultiple: {
        order: 6,
        type: 'number',
        default: 2,
        minimum: 1
    },
    maxInitialVelocity: {
        order: 7,
        type: 'object',
        properties: {
            x: {
                title: 'x',
                type: 'number',
                default: 5,
                minimum: 0
            },
            y: {
                title: 'y',
                type: 'number',
                default: 5,
                minimum: 0
            }
        }
    },
    wind: {
        order: 8,
        type: 'object',
        properties: {
            x: {
                title: 'x',
                type: 'number',
                default: 0
            },
            y: {
                title: 'y',
                type: 'number',
                default: 0
            }
        }
    }
}

class WhatToDraw {
    texture:string;
    image:string;
    monochrome:boolean;
    minSize: number;
    maxSize: number;
    opacity: number;
    range() {
        let r = this.maxSize - this.minSize;
        return r>0?r:0;
    }
}

export class Config {
    whatToDraw = new WhatToDraw();
    rotation: number;
    emitEveryTime: number;
    rateOfAging: number;
    clickCountMultiple: number;
    clickSizeMultiple: number;
    maxInitialVelocity = new PVector(0, 0);
    wind = new PVector(0, 0);

    setData(config: any) {
        let func = (obj: any, setObj: any, key: string) => {
            let props = Object.getOwnPropertyNames(setObj);
            props.forEach((prop) => {
                let properties = setObj[prop].properties;
                let curKey = key + '.' + prop;
                if (properties) {
                    func(obj[prop], properties, curKey);
                    return;
                }
                obj[prop] = config.get(curKey);
            });
        };
        func(this, settings, 'particle-fly');
    }
}
