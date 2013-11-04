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

        λ.each(function (item) {
            regex = regex.replace(item, "([\\w\\d]+)");
            parameters.push(item.replace(/\{/, "").replace(/\}$/, ""));
        }, placeholders);

        return {
            "froute": froute,
            "regex": new RegExp("^" + regex + "$"),
            "parameters": parameters
        };
    };

    return picker;
})();

if (typeof (module) !== "undefined" && module.exports) {
    module.exports = picker;
}