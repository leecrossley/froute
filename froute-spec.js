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

    it("should dispatch with a static url and template", function() {
        var template = "/apples",
            calledBack = 0;
        
        var bindResult = froute.bind(template, function() {
            calledBack++;
        });

        froute.dispatch("/apples");

        expect(bindResult).toBeTruthy();
        expect(froute.list().length).toEqual(1);
        expect(calledBack).toEqual(1);
    });

    it("should dispatch a url with parameter", function() {
        var template = "/apple/{type}",
            type = "unknown";
        
        var bindResult = froute.bind(template, function(params) {
            type = params.type;
        });

        froute.dispatch("/apple/gala");

        expect(bindResult).toBeTruthy();
        expect(froute.list().length).toEqual(1);
        expect(type).toEqual("gala");
    });

    it("should dispatch a url with multiple parameters", function() {
        var template = "/apple/{type}/size/{size}",
            resultParams;
        
        var bindResult = froute.bind(template, function(params) {
            resultParams = params;
        });

        froute.dispatch("/apple/gala/size/large");

        expect(bindResult).toBeTruthy();
        expect(froute.list().length).toEqual(1);
        expect(resultParams).toEqual({type:"gala",size:"large"});
    });

});