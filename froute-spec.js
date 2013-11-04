describe("froute", function() {
    afterEach(froute.reset);

    var nothing = function () {};

    it("should not be null", function() {
        expect(froute).not.toBeNull();
        expect(froute.bind).not.toBeNull();
    });

    it("should bind a template", function() {
        var template = "/apples",
            result = froute.bind(template, nothing);

        expect(result).toBeTruthy();
        expect(froute.list().length).toEqual(1);
    });

    it("should bind 2 templates", function() {
        var template1 = "/apples",
            template2 = "/apple/{id}",
            result1 = froute.bind(template1, nothing),
            result2 = froute.bind(template2, nothing);

        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(froute.list().length).toEqual(2);
    });

    it("should not bind a duplicate template", function() {
        var template = "/apple/{id}",
            result1 = froute.bind(template, nothing),
            result2 = froute.bind(template, nothing);

        expect(result1).toBeTruthy();
        expect(result2).toBeFalsy();
        expect(froute.list().length).toEqual(1);
    });

    it("should not unbind a template that doesn't exist", function() {
        var template = "/apples",
            result = froute.unbind(template);

        expect(result).toEqual([]);
        expect(froute.list().length).toEqual(0);
    });

    it("should bind and unbind a template", function() {
        var template = "/apples",
            result1 = froute.bind(template, nothing),
            result2 = froute.unbind(template);

        expect(result1).toBeTruthy();
        expect(result2.length).toEqual(1);
        expect(result2[0].froute).toEqual(template);
    });

});