if (typeof (λ) === "undefined") { 
    var λ = require("functional.js");
}

var picker = (function () {
    "use strict";
    var picker = {};

    picker.pick = function (froute) {
        var placeholders = froute.match(/\{([^}]+)\}/g),
            regex = froute,
            parameters = [];

        if (placeholders) {
            λ.each(function (item) {
                regex = regex.replace(item, "([\\w\\d]+)");
                parameters.push(item.replace(/\{/, "").replace(/\}$/, ""));
            }, placeholders);
        }

        return {
            "froute": froute,
            "regex": new RegExp("^" + regex + "$"),
            "parameters": parameters
        };
    };

    picker.match = λ.curry(function (test, picked) {
        var match = test.match(picked.regex),
            result = {};
        if (match) {
            λ.each(function (item, i) {
                result[item] = match[i + 1];
            }, picked.parameters);
            return result;
        }
        return false;
    });

    return picker;
})();

if (typeof (module) !== "undefined" && module.exports) {
    module.exports = picker;
}