"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Partical_1 = require("./Partical");
var ExPartical = (function (_super) {
    __extends(ExPartical, _super);
    function ExPartical() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.r = 0;
        _this.g = 0;
        _this.b = 0;
        _this.size = 0;
        return _this;
    }
    return ExPartical;
}(Partical_1.Partical));
exports.ExPartical = ExPartical;
//# sourceMappingURL=ExPartical.js.map