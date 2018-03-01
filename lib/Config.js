"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
exports.settings = {
    whatToDraw: {
        order: 1,
        type: 'object',
        properties: {
            texture: {
                order: 1,
                title: 'texture',
                type: 'string',
                "default": 'star',
                "enum": ['- custImage -', 'circular', 'star', 'starSakura']
            },
            monochrome: {
                order: 2,
                title: 'monochrome',
                type: 'boolean',
                "default": false,
                description: 'effectless when texture is \'- custImage -\''
            },
            image: {
                order: 3,
                title: 'images',
                type: 'string',
                "default": '',
                description: 'Image path Set,random for each particle,only effect when texture is \'- custImage -\''
            },
            opacity: {
                order: 4,
                title: 'opacity',
                type: 'number',
                "default": 0.6,
                maximum: 1
            },
            minSize: {
                order: 5,
                title: 'minSize',
                type: 'number',
                "default": 2,
                minimum: 1
            },
            maxSize: {
                order: 6,
                title: 'maxSize',
                type: 'number',
                "default": 10,
                minimum: 2
            }
        }
    },
    rotation: {
        order: 2,
        type: 'number',
        "default": 1
    },
    emitEveryTime: {
        order: 3,
        type: 'integer',
        "default": 1,
        minimum: 1
    },
    rateOfAging: {
        order: 4,
        type: 'number',
        "default": 0.02,
        maximum: 1
    },
    clickCountMultiple: {
        order: 5,
        type: 'integer',
        "default": 3,
        minimum: 1
    },
    clickSizeMultiple: {
        order: 6,
        type: 'number',
        "default": 2,
        minimum: 1
    },
    maxInitialVelocity: {
        order: 7,
        type: 'object',
        properties: {
            x: {
                title: 'x',
                type: 'number',
                "default": 5,
                minimum: 0
            },
            y: {
                title: 'y',
                type: 'number',
                "default": 5,
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
                "default": 0
            },
            y: {
                title: 'y',
                type: 'number',
                "default": 0
            }
        }
    }
};
var WhatToDraw = (function () {
    function WhatToDraw() {
    }
    WhatToDraw.prototype.range = function () {
        var r = this.maxSize - this.minSize;
        return r > 0 ? r : 0;
    };
    return WhatToDraw;
}());
var Config = (function () {
    function Config() {
        this.whatToDraw = new WhatToDraw();
        this.maxInitialVelocity = new PVector_1.PVector(0, 0);
        this.wind = new PVector_1.PVector(0, 0);
    }
    Config.prototype.setData = function (config) {
        var func = function (obj, setObj, key) {
            var props = Object.getOwnPropertyNames(setObj);
            props.forEach(function (prop) {
                var properties = setObj[prop].properties;
                var curKey = key + '.' + prop;
                if (properties) {
                    func(obj[prop], properties, curKey);
                    return;
                }
                obj[prop] = config.get(curKey);
            });
        };
        func(this, exports.settings, 'particle-fly');
    };
    return Config;
}());
exports.Config = Config;
