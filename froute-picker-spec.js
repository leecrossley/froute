describe("froute-picker", function() {

    it("should not be null", function() {
        expect(picker).not.toBeNull();
        expect(picker.pick).not.toBeNull();
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

});