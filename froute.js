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

    froute.list = function () {
        return froutes;
    };

    froute.dispatch = function (url) {
        var matchUrl = picker.match(url),
            params;
        var match = λ.first(function (item) {
            params = matchUrl(item);
            return params;
        }, froutes);
        if (match && typeof(match.func) === "function") {
            match.func(params);
            return true;
        }
        return;
    };

    froute.bind = λ.curry(function (template, func) {
        var picked = picker.pick(template);
        picked.func = func;
        return add(picked);
    });

    froute.unbind = function (template) {
        var partitioned = λ.partition(function (item) {
            return template === item.froute;
        }, froutes);
        froutes = partitioned[1];
        return partitioned[0];
    };

    froute.reset = function () {
        froutes = [];
    };

    return froute;
})();

if (typeof (module) !== "undefined" && module.exports) {
    module.exports = froute;
}