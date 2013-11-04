describe("froute", function() {
    afterEach(froute.reset);

    it("should not be null", function() {
        expect(froute).not.toBeNull();
        expect(froute.bind).not.toBeNull();
    });

    it("should bind a template", function() {
        var template = "/apples",
            result = froute.bind(template, null);

        expect(result).toBeTruthy();
    });

    it("should bind 2 templates", function() {
        var template1 = "/apples",
            template2 = "/apple/{id}",
            result1 = froute.bind(template1, null),
            result2 = froute.bind(template2, null);

        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
    });

    it("should not bind a duplicate template", function() {
        var template = "/apple/{id}",
            result1 = froute.bind(template, null),
            result2 = froute.bind(template, null);

        expect(result1).toBeTruthy();
        expect(result2).toBeFalsy();
    });

});