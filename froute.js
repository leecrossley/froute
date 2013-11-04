if (typeof (λ) === "undefined") {
    var picker = require("froute-picker"),
        λ = require("functional.js");
}

var froute = (function () {
    "use strict";
    var froute = {},
        froutes = [];

    var add = function (picked) {
        var exists = λ.any(function (item) {
            return picked.froute === item.froute;
        }, froutes);
        if (exists) {
            return false;
        } 
        froutes.push(picked);
        return true;
    };

    froute.bind = λ.curry(function (template, func) {
        var picked = picker.pick(template);
        picked.func = func;
        return add(picked);
    });

    froute.reset = function () {
        froutes = [];
    };

    return froute;
})();

if (typeof (module) !== "undefined" && module.exports) {
    module.exports = froute;
}