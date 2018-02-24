"use strict";
exports.__esModule = true;
var PVector_1 = require("./script/PVector");
exports.settings = {
    emitEveryTime: {
        type: 'integer',
        "default": 1,
        minimum: 1
    },
    rateOfAging: {
        type: 'number',
        "default": 0.02,
        maximum: 1
    },
    maxSize: {
        type: 'number',
        "default": 10,
        minimum: 1
    },
    opacity: {
        type: 'number',
        "default": 0.6,
        maximum: 1
    },
    clickCountMultiple: {
        type: 'integer',
        "default": 6,
        minimum: 1
    },
    clickSizeMultiple: {
        type: 'number',
        "default": 4,
        minimum: 1
    },
    maxInitialVelocity: {
        type: 'object',
        properties: {
            x: {
                type: 'number',
                "default": 5,
                minimum: 0
            },
            y: {
                type: 'number',
                "default": 5,
                minimum: 0
            }
        }
    },
    wind: {
        type: 'object',
        properties: {
            x: {
                type: 'number',
                "default": 0
            },
            y: {
                type: 'number',
                "default": 0
            }
        }
    }
};
var Config = (function () {
    function Config() {
        this.maxInitialVelocity = new PVector_1.PVector(0, 0);
        this.wind = new PVector_1.PVector(0, 0);
    }
    Config.prototype.setData = function (config) {
        this.emitEveryTime = config.get('partical-fly.emitEveryTime');
        this.rateOfAging = config.get('partical-fly.rateOfAging');
        this.opacity = config.get('partical-fly.opacity');
        this.maxSize = config.get('partical-fly.maxSize');
        this.clickCountMultiple = config.get('partical-fly.clickCountMultiple');
        this.clickSizeMultiple = config.get('partical-fly.clickSizeMultiple');
        this.maxInitialVelocity.x = config.get('partical-fly.maxInitialVelocity.x');
        this.maxInitialVelocity.y = config.get('partical-fly.maxInitialVelocity.y');
        this.wind.x = config.get('partical-fly.wind.x');
        this.wind.y = config.get('partical-fly.wind.y');
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map