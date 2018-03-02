"use strict";
exports.__esModule = true;
exports.Colors = {
    white: 0xFFFFFF,
    pink: 0xffbbbb,
    random: function () { return Math.round(Math.random() * 0xFFFFFF); },
    toHex: function (c) {
        console.log(c.toHexString());
        return parseInt("0x" + c.toHexString().substring(1));
    }
};
