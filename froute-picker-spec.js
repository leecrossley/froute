describe("froute-picker", function() {

    it("should not be null", function() {
        expect(picker).not.toBeNull();
        expect(picker.pick).not.toBeNull();
        expect(picker.match).not.toBeNull();
    });

    it("should pick static froute", function() {
        var froute = "/items",
            picked = picker.pick(froute);

        expect(picked).not.toBeNull();
        expect(picked.froute).toEqual(froute);
        expect(picked.regex).toEqual(new RegExp("^/items$"));
        expect(picked.parameters.length).toEqual(0);
    });

    it("should pick a single piece of froute", function() {
        var froute = "/item/{id}",
            picked = picker.pick(froute);

        expect(picked).not.toBeNull();
        expect(picked.froute).toEqual(froute);
        expect(picked.regex).toEqual(new RegExp("^/item/([\\w\\d]+)$"));
        expect(picked.parameters.length).toEqual(1);
        expect(picked.parameters).toEqual(["id"]);
    });

    it("should pick multiple pieces of froute", function() {
        var froute = "/item/{id}/option/{optionId}",
            picked = picker.pick(froute);

        expect(picked).not.toBeNull();
        expect(picked.froute).toEqual(froute);
        expect(picked.regex).toEqual(new RegExp("^/item/([\\w\\d]+)/option/([\\w\\d]+)$"));
        expect(picked.parameters.length).toEqual(2);
        expect(picked.parameters).toEqual(["id", "optionId"]);
    });

    it("should not match apples and oranges", function() {
        var froute = "/apple",
            picked = picker.pick(froute),
            matchOrange = picker.match("/orange");

        expect(matchOrange(picked)).toBeFalsy();
    });

    it("should match apples and apples", function() {
        var froute = "/apples",
            picked = picker.pick(froute),
            matchApples = picker.match("/apples");
            result = matchApples(picked);

        expect(result).not.toBeNull();
        expect(result).toEqual({});
    });

    it("should match apple and type", function() {
        var froute = "/apple/{type}",
            picked = picker.pick(froute),
            matchApple = picker.match("/apple/gala");
            result = matchApple(picked);

        expect(result).not.toBeNull();
        expect(result.type).toEqual("gala");
    });

    it("should match apple, type and size", function() {
        var froute = "/apple/{type}/size/{size}",
            picked = picker.pick(froute),
            matchApple = picker.match("/apple/gala/size/large");
            result = matchApple(picked);

        expect(result).not.toBeNull();
        expect(result.type).toEqual("gala");
        expect(result.size).toEqual("large");
    });

});