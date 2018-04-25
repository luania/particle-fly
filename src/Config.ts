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
                enum: ['- custImage -', 'circular', 'star', 'cross', 'hexagram']
            },
            color: {
                order: 2,
                title: 'color',
                type: 'color',
                default: 'white'
            },
            randomColor: {
                order: 3,
                title: 'randomColor',
                type: 'boolean',
                default: true,
            },
            image: {
                order: 5,
                title: 'images',
                type: 'string',
                default: '',
                description: 'local or net image,cut with \';\',random for each particle,only effect when texture is \'- custImage -\''
            },
            opacity: {
                order: 6,
                title: 'opacity',
                type: 'number',
                default: 0.6,
                maximum: 1
            },
            minSize: {
                order: 7,
                title: 'minSize',
                type: 'number',
                default: 2,
                minimum: 1
            },
            maxSize: {
                order: 8,
                title: 'maxSize',
                type: 'number',
                default: 10,
                minimum: 2
            },
            blur: {
                order: 9,
                title: 'blur',
                type: 'number',
                default: 0,
            },
            starPoints: {
                order: 10,
                title: 'starPoints',
                type: 'number',
                default: 5,
                minimum: 3,
            }
        }
    },
    alwaysEmit: {
        order: 2,
        type: 'boolean',
        default: false
    },
    randomInitialAngle: {
        order: 3,
        type: 'boolean',
        default: false
    },
    rotation: {
        order: 4,
        type: 'number',
        default: 1
    },
    emitEveryTime: {
        order: 5,
        type: 'integer',
        default: 1,
        minimum: 1
    },
    rateOfAging: {
        order: 6,
        type: 'number',
        default: 0.02,
        maximum: 1
    },
    clickCountMultiple: {
        order: 7,
        type: 'integer',
        default: 3,
        minimum: 1
    },
    clickSizeMultiple: {
        order: 8,
        type: 'number',
        default: 2,
        minimum: 1
    },
    maxInitialVelocity: {
        order: 9,
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
        order: 10,
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
    texture: string;
    image: string;
    randomColor: boolean;
    color: any;
    minSize: number;
    maxSize: number;
    opacity: number;
    blur: number;
    starPoints: number;
    range() {
        let r = this.maxSize - this.minSize;
        return r > 0 ? r : 0;
    }
    getImageArr() {
        let urlsTemp = this.image.split(';');
        let urls = [];
        for(let url of urlsTemp){
            if(url && url != "" ){
                urls.push(url);
            }
        }
        return urls;
    }
}

export class Config {
    whatToDraw = new WhatToDraw();
    alwaysEmit: boolean;
    randomInitialAngle: boolean;
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
