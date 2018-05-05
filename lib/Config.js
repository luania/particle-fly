"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
exports.settings = {
    eventToDraw: {
        order: 1,
        type: 'object',
        properties: {
            onMouseMove: {
                order: 1,
                title: 'onMouseMove',
                type: 'boolean',
                "default": true
            },
            onMouseClick: {
                order: 2,
                title: 'onMouseClick',
                type: 'boolean',
                "default": true
            },
            alwaysEmitAtMouse: {
                order: 3,
                title: 'alwaysEmitAtMouse',
                type: 'boolean',
                "default": false
            },
            onEdit: {
                order: 4,
                title: 'onEdit',
                type: 'boolean',
                "default": true
            }
        }
    },
    whatToDraw: {
        order: 2,
        type: 'object',
        properties: {
            texture: {
                order: 1,
                title: 'texture',
                type: 'string',
                "default": 'star',
                "enum": ['- custImage -', 'circular', 'star', 'cross', 'hexagram']
            },
            color: {
                order: 2,
                title: 'color',
                type: 'color',
                "default": 'white'
            },
            randomColor: {
                order: 3,
                title: 'randomColor',
                type: 'boolean',
                "default": true
            },
            image: {
                order: 5,
                title: 'images',
                type: 'string',
                "default": '',
                description: 'local or net image,cut with \';\',random for each particle,only effect when texture is \'- custImage -\''
            },
            opacity: {
                order: 6,
                title: 'opacity',
                type: 'number',
                "default": 0.6,
                maximum: 1
            },
            minSize: {
                order: 7,
                title: 'minSize',
                type: 'number',
                "default": 2,
                minimum: 1
            },
            maxSize: {
                order: 8,
                title: 'maxSize',
                type: 'number',
                "default": 10,
                minimum: 2
            },
            blur: {
                order: 9,
                title: 'blur',
                type: 'number',
                "default": 0
            },
            starPoints: {
                order: 10,
                title: 'starPoints',
                type: 'number',
                "default": 5,
                minimum: 3
            }
        }
    },
    randomInitialAngle: {
        order: 4,
        type: 'boolean',
        "default": true
    },
    rotation: {
        order: 5,
        type: 'number',
        "default": 1
    },
    emitEveryTime: {
        order: 6,
        type: 'integer',
        "default": 1,
        minimum: 1
    },
    rateOfAging: {
        order: 7,
        type: 'number',
        "default": 0.02,
        maximum: 1
    },
    clickCountMultiple: {
        order: 8,
        type: 'integer',
        "default": 3,
        minimum: 1
    },
    clickSizeMultiple: {
        order: 9,
        type: 'number',
        "default": 2,
        minimum: 1
    },
    maxInitialVelocity: {
        order: 10,
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
        order: 11,
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
var EventToDraw = (function () {
    function EventToDraw() {
    }
    return EventToDraw;
}());
var WhatToDraw = (function () {
    function WhatToDraw() {
    }
    WhatToDraw.prototype.range = function () {
        var r = this.maxSize - this.minSize;
        return r > 0 ? r : 0;
    };
    WhatToDraw.prototype.getImageArr = function () {
        var urlsTemp = this.image.split(';');
        var urls = [];
        for (var _i = 0, urlsTemp_1 = urlsTemp; _i < urlsTemp_1.length; _i++) {
            var url = urlsTemp_1[_i];
            if (url && url != "") {
                urls.push(url);
            }
        }
        return urls;
    };
    return WhatToDraw;
}());
var Config = (function () {
    function Config() {
        this.eventToDraw = new EventToDraw();
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
